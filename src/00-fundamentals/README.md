# 00 — Fundamentals (Mind Map)

> Goal: remember the _toolbox_ of JS/TS fundamentals so I can deduce solutions.

---

## 1) Iteration

- **When I need index control**
  - `for (let i=0; i<arr.length; i++)`
  - `while` (pointer/scanner)
- **When I need values**
  - `for..of` (arrays, strings, maps, sets)
- **Objects**
  - `Object.keys / values / entries`
  - `for..in` + `Object.hasOwn` (only if needed)
- **Run-at-least-once**
  - `do..while`

📄 Script: [`iteration.ts`](./iteration.ts)

---

## 2) Control Flow

- `if / else if / else`
- `switch` (finite known cases)
- `cond ? a : b` (simple expressions)
- Loop control: `break / continue`
- Function control: `return` (early return / guard clauses)

📄 Script: [`control-flow.ts`](./control-flow.ts)

---

## 3) Comparisons

- **Strict equality**
  - `===` / `!==` (default choice)
- **Relational**
  - `< > <= >=`
- Gotchas
  - `NaN` → use `Number.isNaN`
  - Sorting numbers needs comparator: `(a,b)=>a-b`

📄 Script: [`comparisons.ts`](./comparisons.ts)

---

## 4) Boolean Logic

- Operators: `&&` `||` `!`
- **Nullish tools**
  - `??` (only null/undefined)
  - `?.` (safe access)
- Patterns
  - guards: `if (!x) return`
  - defaults: `value ?? fallback`

📄 Script: [`boolean-logic.ts`](./boolean-logic.ts)

---

## 5) Assignment & Updates

- Assignment: `=`
- Compound: `+= -= *= /= **=`
- Increment: `++ / --` (prefer `+= 1` for clarity)
- Logical assignment:
  - `||=` (falsy)
  - `&&=` (truthy)
  - `??=` (nullish)

📄 Script: [`assignment.ts`](./assignment.ts)

---

## 6) Destructuring

- Arrays: `[x, y]`, skip, defaults, `...rest`
- Objects: `{a}`, rename `{a: alias}`, defaults, `...rest`
- Nested: prefer `?.` + `??` to avoid crashes
- Function params destructuring

📄 Script: [`destructuring.ts`](./destructuring.ts)

---

## 7) Spread vs Rest

- **Spread = expands**
  - arrays: `[...a, ...b]`
  - objects: `{...a, ...b}`
  - calls: `fn(...args)`
- **Rest = collects**
  - params: `(...args)`
  - destructuring: `[head, ...tail]`, `{x, ...rest}`

📄 Script: [`spread-rest.ts`](./spread-rest.ts)

---

## 8) Functions

- Declaration vs expression vs arrow
- Callbacks
- Higher-order functions (takes/returns fn)
- Closures (captures variables)
- Mental model: `map/filter/reduce` = HOFs

📄 Script: [`functions.ts`](./functions.ts)

---

## 9) Errors

- `throw new Error(...)`
- `try/catch/finally`
- `catch (unknown)` + `instanceof Error`
- Custom errors (e.g. `ValidationError`)
- Wrap errors with `cause`

📄 Script: [`errors.ts`](./errors.ts)

---

## 10) Coercion (Conversions)

- Explicit: `String()` `Number()` `Boolean()`
- Parsing: `parseInt(str, 10)` / `parseFloat`
- Gotchas:
  - `Number('') === 0`
  - `Number('12px') => NaN`
- Prefer explicit conversion + `Number.isNaN`

📄 Script: [`coercion.ts`](./coercion.ts)

---

## 11) Type Checks & Narrowing (TS)

- `typeof` (primitives)
- `Array.isArray`
- `instanceof`
- `Object.hasOwn` vs `"k" in obj`
- Type guards: `x is T`
- Assertions: `asserts x is T`

📄 Script: [`type-checks.ts`](./type-checks.ts)

---

## 12) Reference Equality

- primitives: compare by value
- objects/arrays: compare by reference
- shallow equality patterns
- prefer comparing by stable key (id)

📄 Script: [`reference-equality.ts`](./reference-equality.ts)

---

## 13) Immutability (Practical)

- shallow clone: `{...obj}`, `[...arr]`
- update without mutation: `map/filter/slice/concat`
- nested updates: copy each level touched
- mutable array methods to watch:
  - `sort`, `reverse`, `splice`, `push/pop/shift/unshift`

📄 Script: [`immutability.ts`](./immutability.ts)

---

## Quick Rules (mental triggers)

- “Need a default but keep 0/''?” → `??`
- “Safe nested access?” → `?.`
- “Avoid deep nesting?” → guard clause + early `return`
- “Sorting numbers?” → comparator `(a,b)=>a-b`
- “Objects compared?” → reference; compare by `id` or implement equality
- “Updating state?” → copy on write (immutability)
