# Eterhub Backlog

## Pending Tasks & Technical Debt

### Pre-Launch Requirements
- **Email Verification:** Designed but not fully wired. Members can currently register without confirming their email address.
- **Payment Processing:** Integration (Stripe or equivalent) is required. Currently no subscription billing or paywall in place.
- **Input Validation:** Systematic input validation using Zod has been started but needs to be applied consistently across all Server Actions.
- **Production Infrastructure Setup:**
  - Configure production Sentry DSN.
  - Set up production Upstash Redis.
  - Configure domain DNS.
  - Set final Vercel environment variables.
- **Forgot Password Flow:** The page for Members exists, but the end-to-end flow has not been fully verified.

### Ongoing Known Issues
- Reference legacy documentation (`.gemini/thingstofix.md` and other specs) for any deeper architectural technical debt that may still be pending or requires final review before a 1.0 launch.
