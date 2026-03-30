# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite + React + TypeScript single-page site. App entry points live in `src/main.tsx` and `src/App.tsx`. Page-level views are in `src/pages`, shared UI lives in `src/components/common`, and layout components live in `src/components/layout`. Global styles are in `src/index.css` and `src/App.css`. Static assets that should be served directly belong in `public`, including `public/images` and `public/music`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server with hot reload.
- `npm run build`: run TypeScript project checks, then create a production build in `dist`.
- `npm run lint`: run ESLint across the repository.
- `npm run preview`: serve the built output locally for a final browser check.

Run commands from the repository root: `C:\Users\Juliet\Gizelle-Armando`.

## Coding Style & Naming Conventions
Use TypeScript with React function components and named exports for shared UI where practical. Keep component files in PascalCase, for example `GalleryPage.tsx` or `SectionTitle.tsx`. Use 2-space to 4-space indentation consistently within a file; do not mix styles in the same edit. Prefer single quotes in files that already use them, and preserve existing Tailwind utility ordering unless there is a reason to refactor. Lint with `eslint.config.js` before opening a PR.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, treat `npm run lint` and `npm run build` as required checks for every change. For UI updates, manually verify the home flow, section navigation, media loading, and responsive behavior in the Vite preview. If you add tests later, keep them next to the feature or under `src/__tests__` using `*.test.tsx` naming.

## Commit & Pull Request Guidelines
Recent history uses short messages such as `updates` and `quick updates to use photos`. Keep commits small, but use clearer imperative summaries like `Update gallery image ordering` or `Fix RSVP section spacing`. PRs should include a brief description, note any asset changes under `public`, link related issues when available, and attach screenshots or short recordings for visible UI changes.

## Assets & Content Notes
Optimize images before adding them to `public/images`, and keep filenames stable if referenced directly in components. Large media files should be added only when required for the user-facing experience.

## Rules & Reminders
When editing invitation copy or RSVP messaging, preserve the event rules clearly and respectfully. Keep these points consistent across pages and assets: no plus-ones unless explicitly stated by the couple, guests should not attend only for the reception meal and leave immediately after, and the invitation is private and should not be redistributed, reposted, or forwarded without permission.
