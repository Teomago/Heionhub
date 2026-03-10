# Eterhub Project Structure

This document details the architecture and overarching structure of the Eterhub project. It specifically differentiates between the customizable frontend and the dedicated web apps (such as the Finance App) hosted within the same Next.js repository.

## Overview

Eterhub is built using **Next.js** (employing the App Router) and utilizes **Payload CMS** as its content management backend. The architecture is designed to support:

1. A highly flexible, 100% CMS-customizable public frontend.
2. Distinct, feature-rich web applications that leverage the unified ecosystem.

---

## 1. The Customizable Frontend

The frontend is designed to be entirely managed and customized directly from the Payload CMS admin panel, enabling non-developers to build and modify pages using a block-based system.

### Core Directories

- **`src/app/(frontend)`**
  This route group manages the public-facing pages. It uses a dynamic, catch-all routing structure (`[[...segments]]`) that intercepts URLs, looks up the corresponding page in Payload CMS, and dynamically constructs the page based on the blocks defined by the admin.
- **`src/payload`**
  The brain of the CMS backend. It defines the structure of data available to the frontend admins.
  - `collections/`: Database schemas for major content types like `Pages`, `Articles`, `Users`, etc.
  - `blocks/`: Defines the configurations for modular layout blocks (e.g., media blocks, call-to-actions, hero sections) that admins can drop into pages.
  - `globals/`: Site-wide configurations like navigation menus and footers.

- **`src/modules`**
  The bridge linking Payload data to React. This directory holds the React components that render the CMS data.
  - `blocks/`: The React implementations corresponding to the blocks defined in `src/payload/blocks`.
  - `pages/` & `articles/`: Logic for fetching Payload data and passing it to the appropriate layout templates.

### Workflow

An admin defines a page in Payload CMS involving a combination of blocks. The user visits the URL, `src/app/(frontend)/[[...segments]]` handles the request, queries the Payload database, and iterates through the page's blocks, rendering their respective React components from `src/modules/blocks`.

---

## 2. Web Apps (Finance App)

In addition to the CMS-driven frontend, the project houses dedicated web applications. The first of these is the **Finance App**.

### Core Directories

- **`src/app/app`**
  Unlike the highly dynamic routing of the frontend, this directory contains explicit, hardcoded routes that make up the Finance App's dashboard and functionality. Inside, you will find standard application structures:
  - **`/app/accounts`**: Bank or institutional accounts management.
  - **`/app/budget`**: Budget tracking algorithms and UI.
  - **`/app/categories`**: Expense/income categorization.
  - **`/app/import`**: Tools for importing financial data (like CSVs).
  - **`/app/transactions`**: Transaction ledgers and history.
  - **`/app/reports`** & **`/app/subscriptions`**: Analytics and recurring expense tracking.

Because these reside in specific route folders, they operate independently from the CMS's catch-all segments, allowing for complex, stateful web applications to coexist safely alongside the marketing site.

## Conclusion

- Any modifications to the customizable public site should be focused within `src/payload` (for backend structure) and `src/modules` / `src/app/(frontend)` (for frontend logic and UI).
- Modifications or feature additions to the Finance App should be directed to `src/app/app`.
