/**
 * keys-values-entries.ts
 * Array.prototype.keys / values / entries
 *
 * Mental model:
 * - Return iterators (NOT arrays)
 * - Useful with for..of, or convert using Array.from
 *
 * Signatures:
 *   arr.keys()    => Iterator<number>
 *   arr.values()  => Iterator<T>
 *   arr.entries() => Iterator<[number, T]>
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('keys() - indexes iterator');

const a = ['x', 'y', 'z'];

for (const i of a.keys()) {
  console.log('index:', i);
}

section('values() - values iterator');

for (const v of a.values()) {
  console.log('value:', v);
}

section('entries() - [index, value] iterator');

for (const [i, v] of a.entries()) {
  console.log(`[${i}] =`, v);
}

/** Convert iterators to arrays */
section('Convert iterator to array via Array.from');

log('Array.from(a.keys())', Array.from(a.keys()));
log('Array.from(a.values())', Array.from(a.values()));
log('Array.from(a.entries())', Array.from(a.entries()));

section('Done');
