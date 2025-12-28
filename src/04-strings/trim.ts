/**
 * trim.ts (String.prototype.trim)
 *
 * Mental model:
 * - Remove whitespace from BOTH ends of the string
 * - Returns a NEW string (strings are immutable)
 *
 * Signature:
 *   str.trim() => string
 *
 * Whitespace includes:
 * - spaces, tabs, newlines, etc. (Unicode whitespace)
 *
 * Use when:
 * - sanitizing user input
 * - normalizing tokens before compare/search
 * - parsing numbers / commands
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic trim');

const s = '   hello world   ';
log('original', JSON.stringify(s));
log('trim()', JSON.stringify(s.trim()));

section('Does not affect inner whitespace');

const messy = '  hello   world  ';
log('messy.trim()', JSON.stringify(messy.trim())); // still has multiple spaces inside

section('Normalize user input (common pattern)');

const input = '   YES  ';
const normalized = input.trim().toLowerCase();
log('input', JSON.stringify(input));
log('normalized', JSON.stringify(normalized));
log('isYes?', normalized === 'yes');

section('Trim before parsing');

const rawNumber = '  42 \n';
const parsed = Number(rawNumber.trim());
log('rawNumber', JSON.stringify(rawNumber));
log('Number(rawNumber.trim())', parsed);

section('Trim before split (avoid empty tokens)');

const line = '   split   me   please   ';
const tokensBad = line.split(' '); // creates empty strings
const tokensGood = line.trim().split(/\s+/);

log('tokensBad', tokensBad);
log('tokensGood', tokensGood);

section('Does not mutate original');

let a = '  hi  ';
a.trim(); // ignored result
log('a after ignored trim()', JSON.stringify(a));

a = a.trim(); // assigned
log('a after assign', JSON.stringify(a));

section('Done');
