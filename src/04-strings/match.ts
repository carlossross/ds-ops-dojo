/**
 * match.ts (String.prototype.match)
 *
 * Mental model:
 * - Apply a RegExp to a string and get match results
 * - Returns:
 *   - null (no match)
 *   - array of matches / match object depending on regex flags
 *
 * Signature:
 *   str.match(regexp) => RegExpMatchArray | string[] | null
 *
 * Key behavior:
 * - Without /g:
 *   returns a match object with:
 *     [0] full match, groups, index, input, etc.
 * - With /g:
 *   returns an array of all matched substrings (no groups details)
 *
 * Use when:
 * - you want "first match + groups" (no /g)
 * - you want "all matched substrings" (with /g)
 *
 * For "all matches WITH groups", use matchAll().
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic: first match (no /g)');

const s = 'Order #A12 costs 35 USD';

const m1 = s.match(/\d+/); // first number
log('s', s);
log('m1', m1);
log('m1?.[0] (full match)', m1?.[0]);
log('m1?.index', (m1 as any)?.index);

section('Capture groups (no /g)');

const s2 = '2025-12-27';
const m2 = s2.match(/(\d{4})-(\d{2})-(\d{2})/);

log('s2', s2);
log('m2', m2);
if (m2) {
  const [full, yyyy, mm, dd] = m2;
  log('full', full);
  log('yyyy', yyyy);
  log('mm', mm);
  log('dd', dd);
}

section('Global matches (with /g) => array of strings');

const s3 = 'a1 b22 c333';
const m3 = s3.match(/\d+/g); // all numbers
log('s3', s3);
log('m3', m3); // ["1","22","333"]

/**
 * Note:
 * - With /g you lose group detail; you only get the matched strings.
 * - If you need groups for each match, use matchAll.
 */

section('No matches => null');

const none = 'hello'.match(/\d+/);
log('none', none);

section('Common pattern: safe default');

const digits = s3.match(/\d+/g) ?? [];
log('digits (default [])', digits);

section('Trigger');

log('trigger', 'match(/.../) -> first match + groups');
log('trigger', 'match(/.../g) -> all matches (strings only)');
log('trigger', 'need all matches + groups -> matchAll');

section('Done');
