/**
 * at.ts
 * Array.prototype.at
 *
 * Mental model:
 * - Read element by index (supports negative indexes)
 * - Does NOT mutate
 *
 * Signature:
 *   arr.at(index) => value | undefined
 *
 * Notes:
 * - index >= 0 behaves like arr[index]
 * - index < 0 counts from the end:
 *   -1 => last, -2 => second last, etc.
 * - Out of bounds => undefined
 *
 * Use when:
 * - you want last/previous elements without length math
 * - you want consistent API with strings (String.prototype.at also exists)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Basic reading */
section('Basic reading');

const nums = [10, 20, 30, 40];

log('nums[0]', nums[0]);
log('nums.at(0)', nums.at(0));

log('nums[3]', nums[3]);
log('nums.at(3)', nums.at(3));

/** 2) Negative indexes */
section('Negative indexes');

log('nums.at(-1) (last)', nums.at(-1));
log('nums.at(-2) (second last)', nums.at(-2));

/** 3) Out of bounds */
section('Out of bounds => undefined');

log('nums.at(999)', nums.at(999));
log('nums.at(-999)', nums.at(-999));

/** 4) Common patterns */
section('Common patterns');

const last = nums.at(-1);
const first = nums.at(0);

log('first', first);
log('last', last);

// Guard pattern (avoid undefined)
if (last != null) {
  log('last exists', last);
} else {
  log('last missing', last);
}

/** 5) Compare with length math */
section('Compare with length math');

const lastViaLength = nums[nums.length - 1];
log('lastViaLength', lastViaLength);
log('same?', lastViaLength === nums.at(-1));

/** 6) Works nicely with objects too */
section('Objects: last item safely');

type Event = { type: string; ts: number };
const events: Event[] = [
  { type: 'open', ts: 1 },
  { type: 'click', ts: 2 },
  { type: 'close', ts: 3 },
];

const lastEvent = events.at(-1);
log('lastEvent', lastEvent);
log('lastEvent.type (safe)', lastEvent?.type ?? 'none');

section('Done');
