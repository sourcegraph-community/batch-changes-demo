# Podcast Index

A synthetic mono repo demonstrating Sourcegraph batch changes capabilities.

## Purpose

This repository demonstrates two types of batch changes:

1. **Simple String Replacement** - Upgrading vulnerable dependency versions
2. **Complex Rewrite Logic** - Migrating console.* calls to structured logging

**Do not deploy this code to production.** This is for demonstration purposes only.

---

## Demo Scenario 1: Dependency Version Upgrades

### Known Vulnerabilities

| Package | Current Version | CVEs | Patched Version |
|---------|-----------------|------|-----------------|
| React | 19.1.0 | CVE-2025-55182, CVE-2025-55183, CVE-2025-55184, CVE-2025-67779 | 19.1.4 |
| Next.js | 15.1.0 | Affected by React Server Components vulnerabilities | 15.1.11 |

### Verification

```bash
find packages -name "package.json" | xargs grep -E '"(react|next)":'
```

Expected output (vulnerable versions):
```
packages/shared-ui/package.json:    "react": "19.1.0"
packages/api-service/package.json:    "next": "15.1.0",
packages/api-service/package.json:    "react": "19.1.0",
packages/web-app/package.json:    "next": "15.1.0",
packages/web-app/package.json:    "react": "19.1.0",
```

After batch change, versions should update to `react: 19.1.4` and `next: 15.1.11`.

---

## Demo Scenario 2: Complex Rewrite - Logger Migration

This scenario demonstrates batch changes that require **AST-level understanding**, not just simple find/replace.

### The Problem

The codebase contains scattered `console.log`, `console.error`, and `console.warn` calls with inconsistent formatting:

```typescript
// Current state (scattered throughout codebase)
console.log('Fetching episodes, id:', id);
console.error('Episode not found:', id);
console.warn('Empty search query received');
console.log('Search completed, found', results.length, 'results for query:', query);
```

### The Solution

Migrate to a structured logger with metadata objects:

```typescript
// Target state (using @podcast-index/shared-ui logger)
import { logger } from '@podcast-index/shared-ui';

logger.info('Fetching episodes', { id });
logger.error('Episode not found', { id });
logger.warn('Empty search query received');
logger.info('Search completed', { resultCount: results.length, query });
```

### Why This Is Complex

This transformation cannot be done with simple regex because:

1. **Variable extraction**: `console.log('msg:', var)` → `logger.info('msg', { var })`
2. **Method mapping**: `console.log` → `logger.info`, `console.error` → `logger.error`
3. **Multiple arguments**: Must be restructured into message + metadata object
4. **String concatenation**: `'msg ' + var` must become template + metadata
5. **Import addition**: Must add logger import to files that don't have it

### Verification

Count console.* calls before migration:

```bash
grep -r "console\.\(log\|error\|warn\)" packages --include="*.ts" --include="*.tsx" | wc -l
```

Files affected:
- `packages/api-service/app/api/episodes/route.ts`
- `packages/api-service/app/api/search/route.ts`
- `packages/api-service/app/api/subscribe/route.ts`
- `packages/api-service/lib/podcast-data.ts`
- `packages/web-app/app/actions.ts`

After batch change, all `console.*` calls should be replaced with `logger.*` calls.

---

## Batch Specs

Pre-built batch specifications are available in the `batch-specs/` directory:

| File | Description | Transformation Type |
|------|-------------|---------------------|
| `upgrade-react-nextjs.yaml` | Upgrade React & Next.js to patched versions | Simple string replacement |
| `migrate-to-structured-logger.yaml` | Convert console.* to structured logger | Complex AST rewrite (comby) |

### Running Batch Changes

#### Prerequisites

1. Install the [Sourcegraph CLI](https://docs.sourcegraph.com/cli):
   ```bash
   brew install sourcegraph/src-cli/src-cli
   # or
   curl -L https://sourcegraph.com/.api/src-cli/src_darwin_arm64 -o /usr/local/bin/src
   ```

2. Authenticate with your Sourcegraph instance:
   ```bash
   src login https://your-sourcegraph-instance.com
   ```

#### Preview a Batch Change

```bash
# Preview the dependency upgrade batch change
src batch preview -f batch-specs/upgrade-react-nextjs.yaml

# Preview the logger migration batch change
src batch preview -f batch-specs/migrate-to-structured-logger.yaml
```

#### Apply a Batch Change

After reviewing the preview, click **Apply** in the Sourcegraph UI, or:

```bash
src batch apply -f batch-specs/upgrade-react-nextjs.yaml
```

### Batch Spec Details

#### 1. upgrade-react-nextjs.yaml

Uses `sed` for simple version string replacement:

```yaml
steps:
  - run: sed -i 's/"react": "19.1.0"/"react": "19.1.4"/g' package.json
    container: alpine:3.19
```

#### 2. migrate-to-structured-logger.yaml

Uses [comby](https://comby.dev) for structural code transformation:

```yaml
steps:
  - run: comby -in-place "console.log(':[msg]:', :[var])" "logger.info(':[msg]', { :[var] })" .ts .tsx
    container: comby/comby
```

Comby understands code syntax, so `:[msg]` and `:[var]` match actual code structures, not just text patterns.

---

## Structure

```
batch-changes-demo/
├── batch-specs/
│   ├── upgrade-react-nextjs.yaml         # Demo 1: Version upgrades
│   └── migrate-to-structured-logger.yaml # Demo 2: Complex rewrite
├── packages/
│   ├── web-app/          # Main Next.js podcast application
│   ├── api-service/      # Backend API service
│   └── shared-ui/        # Shared React component library + logger
├── package.json          # Root workspace config
└── pnpm-workspace.yaml   # pnpm workspace definition
```

### Packages

- **@podcast-index/web-app**: Main user-facing Next.js application with Server Components and Server Functions
- **@podcast-index/api-service**: Backend API providing podcast data endpoints
- **@podcast-index/shared-ui**: Reusable UI components (Button, Card, Input) and structured logger

## Running Locally

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Development

Run all services:

```bash
pnpm dev
```

Or run individual services:

```bash
# Web app (port 3000)
pnpm web-app

# API service (port 3001)
pnpm api-service
```

## API Endpoints

The API service exposes the following endpoints:

- `GET /api/episodes` - List all podcast episodes
- `GET /api/episodes?id=<id>` - Get a specific episode
- `GET /api/search?q=<query>` - Search episodes by title, description, or podcast name
- `POST /api/subscribe` - Subscribe to a podcast (requires `podcastId` and `email` in body)

## License

MIT
