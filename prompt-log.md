# Prompt Log

A changelog of all work completed on the Podcast Index batch changes demo.

---

## Session: 01/21/2026

### Overview

Created a synthetic mono repo to demonstrate Sourcegraph batch changes capabilities, including both simple string replacements and complex AST-level code transformations.

---

### Task 1: Initialize Mono Repo Structure

**Prompt:** Implement a mono repo structure for a Podcast Index demo with intentionally vulnerable React/Next.js dependencies.

**Work Completed:**

1. Created root workspace configuration:
   - `package.json` - pnpm workspace config
   - `pnpm-workspace.yaml` - workspace definition
   - `tsconfig.base.json` - shared TypeScript config

2. Created `packages/shared-ui` (React 19.1.0):
   - `Button.tsx` - Reusable button component with variants
   - `Card.tsx` - Card component with Header/Body/Footer subcomponents
   - `Input.tsx` - Input component with label, error, and icon support
   - `index.ts` - Component exports

3. Created `packages/api-service` (Next.js 15.1.0, React 19.1.0):
   - `app/api/episodes/route.ts` - GET endpoint for episodes
   - `app/api/search/route.ts` - GET endpoint for search
   - `app/api/subscribe/route.ts` - POST endpoint for subscriptions
   - `lib/podcast-data.ts` - Mock podcast/episode data and helpers

4. Created `packages/web-app` (Next.js 15.1.0, React 19.1.0):
   - `app/layout.tsx` - Root layout with header navigation
   - `app/page.tsx` - Homepage with episode list and search
   - `app/actions.ts` - Server Functions (vulnerable code path)
   - `components/EpisodeCard.tsx` - Episode display card
   - `components/SearchBar.tsx` - Search with live results
   - `components/SubscribeButton.tsx` - Subscription modal
   - Tailwind CSS configuration

5. Created `README.md` with project documentation

**Files Created:** 27 files across 3 packages

---

### Task 2: Relocate to batch-changes-demo Directory

**Prompt:** Move all files into `batch-changes-demo` folder.

**Work Completed:**

- Created `batch-changes-demo/` directory
- Moved all root files and `packages/` directory into it

---

### Task 3: Add Complex Rewrite Demo Scenario

**Prompt:** Add demo for batch changes executing complex rewrite logic, not just simple string replacements.

**Work Completed:**

1. Added `console.log/error/warn` calls throughout the codebase:
   - `packages/api-service/app/api/episodes/route.ts` - 4 logging calls
   - `packages/api-service/app/api/search/route.ts` - 3 logging calls
   - `packages/api-service/app/api/subscribe/route.ts` - 8 logging calls
   - `packages/api-service/lib/podcast-data.ts` - 12 logging calls
   - `packages/web-app/app/actions.ts` - 10 logging calls

2. Created structured logger utility:
   - `packages/shared-ui/src/logger.ts` - Target format for migration
   - Documents the transformation with before/after examples
   - Exports `logger.debug()`, `logger.info()`, `logger.warn()`, `logger.error()`

3. Updated `packages/shared-ui/src/index.ts` to export logger

4. Updated `README.md` with:
   - Demo Scenario 2 documentation
   - Explanation of why this is complex (AST-level understanding required)
   - Verification commands

**Total console.* calls added:** 37 (excluding logger.ts internals)

---

### Task 4: Create Batch Change Specifications

**Prompt:** Create batch changes following Sourcegraph documentation.

**Work Completed:**

1. Created `batch-specs/` directory

2. Created `batch-specs/upgrade-react-nextjs.yaml`:
   - Simple string replacement using `sed`
   - Upgrades `react` 19.1.0 → 19.1.4
   - Upgrades `react-dom` 19.1.0 → 19.1.4
   - Upgrades `next` 15.1.0 → 15.1.11
   - Includes PR template with CVE references

3. Created `batch-specs/migrate-to-structured-logger.yaml`:
   - Complex AST rewrite using **comby**
   - 7 comby transformation steps for different patterns:
     - `console.log('msg')` → `logger.info('msg')`
     - `console.log('msg:', var)` → `logger.info('msg', { var })`
     - `console.error(...)` → `logger.error(...)`
     - `console.warn(...)` → `logger.warn(...)`
   - Shell script step to add missing imports
   - Detailed PR template explaining the transformation

4. Updated `README.md` with:
   - Batch Specs section with table of specs
   - Prerequisites (Sourcegraph CLI installation)
   - Preview and apply commands
   - Batch spec details with code examples
   - Updated structure diagram

---

## Final Structure

```
batch-changes-demo/
├── batch-specs/
│   ├── migrate-to-structured-logger.yaml  # Complex rewrite (comby)
│   └── upgrade-react-nextjs.yaml          # Simple replacement (sed)
├── packages/
│   ├── api-service/                       # Next.js 15.1.0 API
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── episodes/route.ts
│   │   │   │   ├── search/route.ts
│   │   │   │   └── subscribe/route.ts
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── lib/podcast-data.ts
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── shared-ui/                         # React 19.1.0 components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── index.ts
│   │   │   ├── Input.tsx
│   │   │   └── logger.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web-app/                           # Next.js 15.1.0 frontend
│       ├── app/
│       │   ├── actions.ts
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── EpisodeCard.tsx
│       │   ├── SearchBar.tsx
│       │   └── SubscribeButton.tsx
│       ├── next.config.ts
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── prompt-log.md
└── README.md
```

---

## Vulnerable Dependencies (Intentional)

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.1.0 | CVE-2025-55182, CVE-2025-55183, CVE-2025-55184, CVE-2025-67779 |
| react-dom | 19.1.0 | Same RSC vulnerabilities |
| next | 15.1.0 | Affected by React RSC vulnerabilities |

---

## Demo Scenarios

### Scenario 1: Simple String Replacement
- **Batch Spec:** `upgrade-react-nextjs.yaml`
- **Tool:** `sed`
- **Transformation:** Version string updates in package.json

### Scenario 2: Complex AST Rewrite
- **Batch Spec:** `migrate-to-structured-logger.yaml`
- **Tool:** `comby`
- **Transformation:** console.* → structured logger with metadata extraction

---

## Commands

```bash
# Install dependencies
cd batch-changes-demo && pnpm install

# Run development servers
pnpm dev

# Preview batch changes
src batch preview -f batch-specs/upgrade-react-nextjs.yaml
src batch preview -f batch-specs/migrate-to-structured-logger.yaml

# Verify vulnerable dependencies
find packages -name "package.json" | xargs grep -E '"(react|next)":'

# Count console.* calls (before migration)
grep -r "console\.\(log\|error\|warn\)" packages --include="*.ts" --include="*.tsx" | grep -v logger.ts | wc -l
```
