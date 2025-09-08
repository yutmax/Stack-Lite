# Stack Lite - Code Snippet Sharing Platform

## Project Overview
This is a full-stack web application for sharing, discovering, and discussing code snippets. The platform allows users to:
- Register and authenticate

- Create, view, edit, and delete code snippets

- Like/dislike posts

- Comment on posts in real-time

- View user profiles and statistics

- Browse questions and answers
 
## Testing

This project uses Vitest + Testing Library for unit and component tests.

Scripts:

- `npm run test` – run all tests once
- `npm run test:watch` – watch mode
- `npm run test:coverage` – run with coverage (output in `coverage/`)

Test files are colocated in `__tests__` folders or may use the `.test.ts(x)` suffix. A global setup file `src/setupTests.ts` loads `@testing-library/jest-dom` matchers.

Recommended patterns:

- Prefer querying by role / label text for accessibility.
- Keep logic in pure functions or Redux slices to simplify testing.
- Mock network / socket interactions at the boundary (e.g., shared/api) if needed.

Example:

```
expect(screen.getByText('Sample Question')).toBeInTheDocument();
```

Run coverage before PRs to ensure important paths are exercised.