# 01 — Arrays (Mind Map)

> Goal: remember the **Array toolbox** so I can deduce solutions (chunk/flatten/groupBy/etc.)
> without memorizing snippets.

---

## Core mental triggers

- **Need 1:1 transform (same length)?** → `map`
- **Need 0..N outputs per item?** → `flatMap`
- **Need to keep some items?** → `filter`
- **Need one final result (any type)?** → `reduce`
- **Need any/all checks?** → `some` / `every`
- **Need first match?** → `find` (value) / `findIndex` (index)
- **Need exact membership?** → `includes` (boolean)
- **Need exact index?** → `indexOf` / `lastIndexOf`
- **Need subarray/copy?** → `slice`
- **Need combine arrays immutably?** → `concat` / spread
- **Need insert/remove in middle (mutating)?** → `splice`
- **Need reorder (mutating)?** → `reverse`, `sort`
- **Need last element without length math?** → `at(-1)`

---

## Categories (curated list)

### transform

- `map` → transform each element (same length)
- `flatMap` → map + flatten(1) → 0..N outputs per input

Scripts:

- `map.ts`
- `flatMap.ts`

---

### select

- `filter` → keep elements by predicate (length shrinks)

Script:

- `filter.ts`

---

### accumulate

- `reduce` → fold array into one result (number, object, map, set, array…)

Script:

- `reduce.ts`

---

### search

- `find` → first matching element (or `undefined`)
- `findIndex` → first matching index (or `-1`)
- `some` → any matches? (boolean, short-circuits)
- `every` → all match? (boolean, short-circuits)
- `includes` → exact membership (SameValueZero; **NaN works**)
- `indexOf` → first exact index (`===`, **NaN fails**)
- `lastIndexOf` → last exact index (`===`, **NaN fails**)

Scripts:

- `find.ts`
- `findIndex.ts`
- `some.ts`
- `every.ts`
- `includes.ts`
- `indexOf.ts`
- `lastIndexOf.ts`

---

### editing & reordering

- `slice` → non-mutating copy/subarray (shallow)
- `concat` → non-mutating combine
- `splice` → **mutating** insert/remove/replace
- `reverse` → **mutating** reverse
- `sort` → **mutating** sort (default string sort; numeric needs comparator)
- `at` → non-mutating read w/ negative indexes

Scripts:

- `slice.ts`
- `concat.ts`
- `splice.ts`
- `reverse.ts`
- `sort.ts`
- `at.ts`

---

### iteration / side-effects

- `forEach` → side effects only (returns void)
  - no `break`
  - async pitfall: does not await

Script:

- `forEach.ts`

---

### create / generate

- `Array.from` → from iterables/array-like; can map while creating
- `fill` → **mutating** initialize range with same value (object reference pitfall)
- `keys/values/entries` → iterators (useful with `for..of`)

Scripts:

- `array-from.ts`
- `fill.ts`
- `keys-values-entries.ts`

---

### modern non-mutate (if available)

> Prefer when supported; fall back to `[...]` copy then mutate method.

- `toSorted` → non-mutating sort
- `toReversed` → non-mutating reverse
- `toSpliced` → non-mutating splice-like

(covered inside `sort.ts`, `reverse.ts`, `splice.ts` as feature detection)

---

## Mutates vs Non-mutates (quick map)

### Non-mutating (safe for state)

- `map`, `flatMap`, `filter`, `reduce`
- `find`, `findIndex`, `some`, `every`, `includes`, `indexOf`, `lastIndexOf`
- `slice`, `concat`, `at`
- `Array.from`, `keys/values/entries` (iterators)
- `toSorted`, `toReversed`, `toSpliced` (modern)

### Mutating (danger for shared state)

- `splice`
- `sort` (and default is string-based!)
- `reverse`
- `fill`
- also (not in this module yet): `push`, `pop`, `shift`, `unshift`

---

## Common “derive solutions” patterns

### Immutable remove/insert/replace

- remove index: `[..., slice(0,i), ...slice(i+1)]`
- insert at i: `[..., slice(0,i), x, ...slice(i)]`
- replace at i: `[..., slice(0,i), newX, ...slice(i+1)]`

### Build lookup / group

- `reduce` into:
  - `Record` (`indexBy`, `countBy`, `groupBy`)
  - `Map`
  - `Set`

### Existence checks (prefer short-circuit)

- “any?” → `some`
- “all?” → `every`
- “first match?” → `find`
