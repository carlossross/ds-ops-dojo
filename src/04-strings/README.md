# 05 — Strings (Mind Map)

> Goal: remember the **String toolbox** so I can deduce solutions (capitalize, parse, tokenize,
> validate, etc.) without memorizing snippets.

---

## Core mental triggers

- **Need a character by index (incl. negative)?** → `at`
- **Need a character but want "" on out-of-bounds?** → `charAt`
- **Need boolean contains?** → `includes`
- **Need position of first/last occurrence?** → `indexOf` / `lastIndexOf`
- **Need prefix/suffix check?** → `startsWith` / `endsWith`
- **Need substring (negative indexes)?** → `slice`
- **Need substring (auto-swap start/end)?** → `substring`
- **Need tokens array from text?** → `split`
- **Need rebuild string from tokens?** → `join` (Array)
- **Need one replacement?** → `replace`
- **Need all replacements?** → `replaceAll` (or `replace(/.../g)`)
- **Need pattern extraction?** → `match` (first/groups) / `matchAll` (all/groups)
- **Need cleanup around input?** → `trim`, `trimStart`, `trimEnd`
- **Need case normalization?** → `toLowerCase`, `toUpperCase`

---

## Categories (curated list)

### read / index

- `at(index)` → supports negative indexes; out-of-bounds → `undefined`
- `charAt(index)` → out-of-bounds → `""` (empty string); no negative indexing

Scripts:

- `at.ts`
- `charAt.ts`

---

### search

- `includes(substr, position?)` → boolean contains (case-sensitive)
- `indexOf(substr, fromIndex?)` → first occurrence index or `-1`
- `lastIndexOf(substr, fromIndex?)` → last occurrence index or `-1`
- `startsWith(prefix, position?)` → boolean prefix check
- `endsWith(suffix, length?)` → boolean suffix check

Scripts:

- `includes.ts`
- `indexOf.ts`
- `lastIndexOf.ts`
- `startsWith.ts`
- `endsWith.ts`

---

### cut (substring)

- `slice(start?, end?)` → supports negatives; end exclusive
- `substring(start, end?)` → negatives become 0; if start > end → swaps

Scripts:

- `slice.ts`
- `substring.ts`

---

### tokenize / rebuild

- `split(separator?, limit?)` → string → string[]
  - regex split is key for whitespace: `trim().split(/\s+/)`
- `join(separator?)` → string[] → string (Array operation but used with strings)

Scripts:

- `split.ts`
- `join.ts`

---

### replace

- `replace(searchValue, replaceValue)`:
  - string search replaces **first** only
  - regex can be global to replace all: `/.../g`
  - supports function replacement for computed output
- `replaceAll(searchValue, replaceValue)`:
  - replaces all occurrences for string search
  - regex must be `/g` or it throws

Scripts:

- `replace.ts`
- `replaceAll.ts`

---

### regex extraction

- `match(/.../)` → first match + groups (or `null`)
- `match(/.../g)` → array of matched strings (no groups details)
- `matchAll(/.../g)` → iterator of matches with groups + indices

Scripts:

- `match.ts`
- `matchAll.ts`

---

### cleanup

- `trim()` → both ends
- `trimStart()` → leading only
- `trimEnd()` → trailing only

Scripts:

- `trim.ts`
- `trimStart.ts`
- `trimEnd.ts`

---

### casing

- `toLowerCase()` → normalize for case-insensitive compare/search
- `toUpperCase()` → normalize codes/labels

Scripts:

- `toLowerCase.ts`
- `toUpperCase.ts`

---

## Common “derive solutions” patterns

### Case-insensitive search

text.toLowerCase().includes(query.toLowerCase())

### Normalize whitespace

text.trim().split(/\s+/).join(" ")

### Extract file extension

dot = name.lastIndexOf(".")
ext = dot === -1 ? "" : name.slice(dot + 1)

### Find prefix ignoring indentation

line.trimStart().startsWith("#")

### Edge cases to remember

includes("") is always true
indexOf returns -1 when missing
at(outOfBounds) → undefined
charAt(outOfBounds) → ""
substring(-1) behaves like substring(0)
replace("x","y") replaces only the first; use replaceAll or /g
