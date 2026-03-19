# mill-test-repo

Simple TypeScript utility library for testing Mill pipeline.

## Commands
- `bun test` — run all tests
- `bun run typecheck` — TypeScript check

## Conventions
- Pure functions, no side effects
- All functions exported from src/index.ts
- Every function has tests in tests/
- Use TypeScript generics where appropriate
- Tests use vitest (describe/it/expect pattern)

## Structure
- src/ — source code (strings.ts, arrays.ts, math.ts)
- tests/ — test files matching source structure
