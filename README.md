# ds-ops-dojo 🥋

A practical toolbox to remember **what JS/TS already gives me** (methods, operators, patterns),
so I can **deduce** solutions (chunk/flatten/groupBy/etc.) instead of memorizing snippets.

---

## How to run

### Scripts (dojo mode)

- Run a specific script:
  - `npx tsx src/00-fundamentals/iteration.ts`
- Run the fundamentals launcher:
  - `npm run run:fund`

### Tests / Types

- `npm test`
- `npm run typecheck`

---

## Mind Map (Modules)

### 00 — Fundamentals (core thinking tools)

- Iteration, control flow, comparisons, boolean logic
- assignment, destructuring, spread/rest
- functions (callbacks, HOF, closures)
- errors, coercion, type checks
- reference equality, immutability

➡️ `src/00-fundamentals/README.md`[](./src/fundamentals/README.md)

---

### 01 — Arrays (Array.prototype toolbox)

Goal: know what arrays can do natively and when to use each operation.

Common categories:

- transform: `map`, `flatMap`
- select: `filter`
- accumulate: `reduce`
- search: `find`, `some`, `every`, `includes`
- editing & reordering: `slice`, `concat`, `sort`, `splice`, `reverse`

➡️ `src/01-arrays/README.md` _(to be added)_

---

### 02 — Objects (Object.\* toolbox + Record patterns)

Goal: use objects as dictionaries and understand iteration/transform patterns.

Core APIs:

- `Object.keys/values/entries`
- `Object.fromEntries`
- `Object.hasOwn`
- spread / assign

➡️ `src/02-objects/README.md` _(to be added)_

---

### 03 — Map

Goal: key/value store with non-string keys + clean iteration.

Core APIs:

- `set/get/has/delete/clear`
- `keys/values/entries`

➡️ `src/03-map/README.md` _(to be added)_

---

### 04 — Set

Goal: membership + de-dup + set operations (conceptually).

Core APIs:

- `add/has/delete/clear`
- iteration

➡️ `src/04-set/README.md` _(to be added)_

---

### 05 — Strings (String.prototype toolbox)

Goal: search/slice/split/replace/match + safe parsing.

Core APIs:

- `includes/indexOf`
- `slice/substring`
- `split`
- `replace/replaceAll`
- `match/matchAll`
- `trim`, case conversion

➡️ `src/05-strings/README.md` _(to be added)_

---

## Build order (recommended)

1. 00-fundamentals ✅
2. 01-arrays
3. 05-strings
4. 02-objects
5. 03-map + 04-set
6. Classic DS (stack/queue/tree/graph/heap) _(later modules)_

---

## Personal rule

I don’t memorize solutions.
I memorize **operations** + **mental triggers** → then I derive the solution.
