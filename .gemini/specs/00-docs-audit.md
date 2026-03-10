# RFC 00: Architecture Audit - Database Escape Hatches

## 1. Executive Summary

This document serves as a specialized audit evaluating the architecture decisions made in earlier requests (specifically **RFC 01: Atomic Balances** and **RFC 03: Database Aggregations**). These implementations bypassed Payload's database-agnostic Local API (`payload.update`, `payload.find`) in favor of direct Mongoose adapter escape hatches (`payload.db.collections[...].updateOne({ $inc })` and `aggregate()`).

The purpose of this audit is to cross-reference these decisions with the official Payload 3.0 documentation (March 2026) to determine if these escape hatches are anti-patterns that must be refactored into native Payload methods.

**Verdict: APPROVED & RECOMMENDED.** Our strategy remains the officially supported workaround for advanced database operations in Payload CMS. No refactoring is necessary.

---

## 2. Audit Findings

### A. Atomic Updates ($inc)

**Context:** RFC 01 implemented atomic account balance updates to prevent race conditions during concurrent transactions.
**Payload Native API:** The official Local API (`payload.update`) relies on standard data replacement. Searching the Payload 3.0 documentation for `increment` reveals no native, database-agnostic support for atomic `$inc` operations within the core `payload.update` API.
**Conclusion:** Payload cannot natively guarantee atomic numeric increments under high concurrency without dropping down to the database adapter.

### B. Database Aggregations ($group, pipelines)

**Context:** RFC 03 utilized MongoDB's aggregation pipelines to instantly calculate budget health across thousands of transactions (`$match`, `$group`).
**Payload Native API:** The official Local API (`payload.find`) is restricted to CRUD operations, filtering (`where`), sorting, pagination, and relation population. It completely lacks native support for MapReduce or grouping (`$group`, `$sum`).
**Conclusion:** Generating complex financial aggregations using native Payload methods would require fetching potentially tens of thousands of documents into Node.js memory (`payload.find({ pagination: false })`) and reducing them via JavaScript. This would be catastrophic for the dashboard's performance.

### C. The Escape Hatch Validity

**Context:** Are we breaking the rules by accessing `payload.db.collections`?
**Payload Official Stance:** According to `docs/payloadcms/database/mongodb.mdx`:

> "After Payload is initialized, this adapter exposes all of your Mongoose models and they are available for you to work with directly. You can access Mongoose models as follows:
>
> - Collection models - `payload.db.collections[myCollectionSlug]`"

**Conclusion:** Dropping down to raw Mongoose is **not a hack**; it is an intentionally exposed, documented feature of the `@payloadcms/db-mongodb` adapter. Payload formally acknowledges that its agnostic layer cannot cover every advanced DB feature (transactions, aggregations, atomic modifiers), and thus safely exposes the underlying driver.

---

## 3. Final Recommendations

1. **Maintain Current Implementations:** Do not attempt to "refactor" RFC 01 or RFC 03 to use the Payload Local API. Doing so would either compromise data integrity (race conditions) or destroy performance (OOM errors from huge memory fetches).
2. **Standardize Escape Hatch Usage:** Whenever we utilize `payload.db.collections`, we accept that we lose Payload's automatic lifecycle hooks (`beforeChange`, `afterChange`, access control). We must continue carefully managing side-effects and security manually for these specific optimized endpoints.
3. **Database Lock-in:** By using `aggregate` and `$inc`, Eterhub is now strictly coupled to MongoDB. If Eterhub ever migrated to PostgreSQL (`@payloadcms/db-postgres`), these custom actions would immediately break and require rewrites utilizing Drizzle ORM escape hatches instead. Given the current scope, this lock-in is perfectly acceptable.
