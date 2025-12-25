/**
 * destructuring.ts
 * Fundamentals: destructuring (arrays/objects) + defaults + renaming + nested
 *
 * Goals:
 * - extract values cleanly
 * - use defaults
 * - rename variables
 * - handle nested data safely (with ?? and optional chaining)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

/** 1) Array destructuring */
section('Array destructuring');

const rgb = [255, 128, 64];
const [r, g, b] = rgb;
log('r', r);
log('g', g);
log('b', b);

// Skip positions
const [first, , third] = [10, 20, 30];
log('first', first);
log('third', third);

// Defaults
const [a = 1, c = 2] = [99]; // only first provided
log('a (provided)', a);
log('c (default)', c);

// Rest in array destructuring
const [head, ...tail] = [1, 2, 3, 4];
log('head', head);
log('tail', tail);

/** 2) Object destructuring */
section('Object destructuring: basic');

const user = { id: 1, name: 'Ada', role: 'admin', active: true };
const { id, name } = user;
log('id', id);
log('name', name);

// Renaming
const { role: userRole } = user;
log('userRole (renamed)', userRole);

// Defaults (when property is missing or undefined)
const { plan = 'free' } = user as { plan?: string };
log('plan (default)', plan);

// Rest in object destructuring (remaining props)
const { active, ...publicUser } = user;
log('active', active);
log('publicUser (rest)', publicUser);

/** 3) Nested destructuring (use carefully) */
section('Nested destructuring (be careful with optional)');

type Profile = {
  name: string;
  address?: { city?: string; zip?: string };
};

const p1: Profile = {
  name: 'Bob',
  address: { city: 'Monterrey', zip: '64000' },
};
const p2: Profile = { name: 'Cara' };

// Safe approach: optional chaining + ??
log('p1 city', p1.address?.city ?? 'Unknown');
log('p2 city', p2.address?.city ?? 'Unknown');

// Direct nested destructuring requires defaults to avoid runtime crash
const { address: addr1 = {} } = p1;
const { city: city1 = 'Unknown' } = addr1 as { city?: string };
log('city1 (via safe nested destructuring)', city1);

const { address: addr2 = {} } = p2;
const { city: city2 = 'Unknown' } = addr2 as { city?: string };
log('city2 (via safe nested destructuring)', city2);

/** 4) Destructuring in function parameters */
section('Destructuring in function parameters');

type Point = { x: number; y: number };
function formatPoint({ x, y }: Point): string {
  return `(${x}, ${y})`;
}
log('formatPoint', formatPoint({ x: 10, y: 20 }));

// With defaults in params
function greet({ name = 'Anonymous' }: { name?: string }) {
  return `Hello, ${name}`;
}
log('greet({})', greet({}));
log("greet({name:'Ada'})", greet({ name: 'Ada' }));

/** 5) Swap variables (classic destructuring trick) */
section('Swap variables');

let left = 'L';
let right = 'R';
log('before', { left, right });

[left, right] = [right, left];
log('after', { left, right });

section('Done');
