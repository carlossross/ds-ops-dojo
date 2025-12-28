/**
 * splice.ts
 * Array.prototype.splice
 *
 * Mental model:
 * - MUTATES the original array
 * - Removes and/or inserts elements at a given index
 * - Returns an array of removed elements
 *
 * Signature:
 *   arr.splice(start, deleteCount?, ...itemsToInsert) => removedElements[]
 *
 * Notes:
 * - start can be negative (counts from end)
 * - deleteCount defaults to (length - start) if omitted
 *
 * Use when:
 * - you intentionally want to modify an array in-place (local data)
 * - implementing low-level data structures (queue/stack variations)
 *
 * Avoid when:
 * - you need immutability (frontend state). Prefer slice+spread or toSpliced.
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Remove elements (mutates) */
section('Remove elements (mutates)');

const a = [10, 20, 30, 40, 50];
log('before', a);

const removed = a.splice(1, 2); // remove 20, 30
log('removed', removed);
log('after', a); // mutated

/** 2) Insert elements (mutates) */
section('Insert elements (mutates)');

const b = [1, 2, 5];
log('before', b);

const removed2 = b.splice(2, 0, 3, 4); // at index 2 remove 0, insert 3,4
log('removed2', removed2); // []
log('after', b); // [1,2,3,4,5]

/** 3) Replace elements (mutates) */
section('Replace elements (mutates)');

const c = ['a', 'b', 'X', 'd'];
log('before', c);

const removed3 = c.splice(2, 1, 'c'); // replace "X" with "c"
log('removed3', removed3);
log('after', c);

/** 4) Negative start index */
section('Negative start index');

const d = [1, 2, 3, 4, 5];
log('before', d);

d.splice(-2, 1, 999); // start at length-2 => index 3
log('after (replace 4 with 999)', d);

/** 5) Gotcha: splice returns removed elements, not the updated array */
section('Gotcha: return value');

const e = [1, 2, 3];
const ret = e.splice(1, 1); // removes [2]
log('ret (removed)', ret);
log('e (mutated)', e);

/** 6) Safer patterns (immutability) */
section('Immutable alternatives: slice + spread');

function toSplicedPolyfill<T>(
  arr: T[],
  start: number,
  deleteCount: number,
  ...items: T[]
): T[] {
  const s =
    start < 0 ? Math.max(arr.length + start, 0) : Math.min(start, arr.length);
  return [...arr.slice(0, s), ...items, ...arr.slice(s + deleteCount)];
}

const base = [10, 20, 30, 40];
log('base', base);

// remove at index 1 (20)
const removedImmutable = [...base.slice(0, 1), ...base.slice(2)];
log('removedImmutable', removedImmutable);

// insert at index 2
const insertedImmutable = [...base.slice(0, 2), 999, ...base.slice(2)];
log('insertedImmutable', insertedImmutable);

// replace at index 0
const replacedImmutable = [...base.slice(0, 0), 111, ...base.slice(1)];
log('replacedImmutable', replacedImmutable);

/** 7) Modern non-mutate (if available): toSpliced */
section('Modern non-mutate: toSpliced (if available)');

const hasToSpliced = typeof (base as any).toSpliced === 'function';
log('toSpliced available?', hasToSpliced);

if (hasToSpliced) {
  const out = (base as any).toSpliced(1, 2, 777); // remove 20,30 insert 777
  log('base unchanged', base);
  log('out (new array)', out);
}

section('Done');
