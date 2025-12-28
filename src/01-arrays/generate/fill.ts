/**
 * fill.ts
 * Array.prototype.fill
 *
 * Mental model:
 * - MUTATES the array by filling a range with a static value
 *
 * Signature:
 *   arr.fill(value, start?, end?) => arr (same reference)
 *
 * Notes:
 * - start is inclusive, end is exclusive
 * - useful for initialization
 *
 * Pitfall:
 * - filling with an object repeats the SAME reference
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic fill */
section('Basic fill (mutates)');

const a = new Array<number>(5);
log('a before', a);

a.fill(0);
log('a after fill(0)', a);

/** 2) Fill range */
section('Fill range (start inclusive, end exclusive)');

const b = [1, 2, 3, 4, 5];
b.fill(9, 1, 4); // indexes 1..3
log('b after fill(9,1,4)', b);

/** 3) Pitfall: object reference repeated */
section('Pitfall: object reference repeated');

type Cell = { visited: boolean };

const gridBad = new Array<Cell>(3).fill({ visited: false });
log('gridBad', gridBad);

gridBad[0]!.visited = true;
log('gridBad after gridBad[0].visited=true', gridBad);
/**
 * All entries changed because they are the same object reference.
 */

/** 4) Correct way: use Array.from to create distinct objects */
section('Correct: distinct objects');

const gridGood = Array.from({ length: 3 }, () => ({ visited: false }));
gridGood[0]!.visited = true;

log('gridGood', gridGood);

section('Done');
