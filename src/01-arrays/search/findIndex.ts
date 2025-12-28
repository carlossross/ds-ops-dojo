/**
 * findIndex.ts
 * Array.prototype.findIndex
 *
 * Mental model:
 * - Return the INDEX of the FIRST element that matches predicate
 * - If none found => -1
 * - Does NOT mutate original array
 *
 * Signature:
 *   arr.findIndex((value, index, array) => boolean) => number
 *
 * Use when:
 * - you need the position to update/remove something by index
 *
 * Avoid when:
 * - you need the element itself (use find)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Find index of first match */
section('Basic: findIndex');

const nums = [5, 8, 12, 3, 9];
const idxFirstGt10 = nums.findIndex((n) => n > 10);

log('nums', nums);
log('idx of first > 10', idxFirstGt10);
log('value at idx', idxFirstGt10 >= 0 ? nums[idxFirstGt10] : 'not found');

/** 2) Not found returns -1 */
section('Not found => -1');

const idxMissing = nums.findIndex((n) => n === 999);
log('idxMissing', idxMissing);

/** 3) Real use: update by id (immutable update) */
section('Use: update object by id (immutable)');

type User = { id: string; name: string; active: boolean };

const users: User[] = [
  { id: 'u1', name: 'Ada', active: true },
  { id: 'u2', name: 'Bob', active: false },
  { id: 'u3', name: 'Cara', active: true },
];

const targetId = 'u2';
const idx = users.findIndex((u) => u.id === targetId);

const updatedUsers =
  idx === -1
    ? users
    : [
        ...users.slice(0, idx),
        { ...users[idx]!, active: true }, // safe because idx !== -1
        ...users.slice(idx + 1),
      ];

log('idx', idx);
log('updatedUsers', updatedUsers);
log('original unchanged?', users[1]?.active === false);

/** 4) Real use: remove by id (immutable) */
section('Use: remove by id (immutable)');

const removeId = 'u1';
const removeIdx = users.findIndex((u) => u.id === removeId);

const without =
  removeIdx === -1
    ? users
    : [...users.slice(0, removeIdx), ...users.slice(removeIdx + 1)];

log('removeIdx', removeIdx);
log('without', without);

section('Done');
