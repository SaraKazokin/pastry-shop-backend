# Pastry Shop Backend - Team Agents & Guidelines

This document outlines the coding standards, architecture decisions, and workflow guidelines for the `pastry-shop-backend` project. 
AI agents (like Copilot/Gemini) should strictly follow these rules when generating or refactoring code for this project.

## 1. Error Handling (Express 5 Standard)
- **NO `try/catch` blocks in controllers.** Express 5 automatically handles rejected promises in async routes.
- **Custom Errors:** Throw errors explicitly using the custom `AppError` class.
  - Example: `throw new AppError('Product not found', 404);`
- **Error Middleware:** All errors must be caught and processed by `middlewares/error.middlewares.js`, which is responsible for parsing Mongoose specific errors (ValidationError, CastError, 11000 duplicate keys).

## 2. MongoDB & Mongoose Architecture
- **References (`ref`):** Use references for linking documents when data should remain dynamic and synced (e.g., linking a `User` to an `Order` or `Review`).
- **Embedded Documents:** Use embedded arrays/objects for data that represents a snapshot in time. 
  - Example: `orderItemSchema` inside `Order` embeds `priceAtPurchase` so historical orders are not affected by future product price changes.
- **Populate:** Use `.populate()` sparingly. Only populate in functions where the client explicitly needs the joined data (e.g., viewing a single order or review).

## 3. Validation
- Use **Joi** for request validation (`req.body`) BEFORE the request reaches the controller.
- The validation middleware (`middlewares/validation.middleware.js`) must format Joi errors and throw them using `AppError(..., 400)`.

## 4. Git & Workflow
- **Branching:** Never push directly to `main`. Always create a new branch for every feature, bug fix, or refactor.
  - Formatting: `feature/name-of-feature`, `bugfix/issue`, `refactor/what-changed`.
- **Pull Requests (PR):** All code must be merged into `main` via a PR.
- **Code Review:** Every PR requires at least 1 approval from a team member before merging.