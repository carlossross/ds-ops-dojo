/**
 * trimStart.ts (String.prototype.trimStart)
 *
 * Mental model:
 * - Remove whitespace from the START (left) only
 * - Returns a NEW string
 *
 * Signature:
 *   str.trimStart() => string
 *
 * Use when:
 * - you want to keep trailing whitespace but ignore indentation/leading spaces
 * - parsing lines with prefixes (commands, comments)
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('Basic trimStart');

const s = '   hello world   ';
log('original', JSON.stringify(s));
log('trimStart()', JSON.stringify(s.trimStart()));

section('Keep trailing spaces (intentional)');

const t = '   keep-end   ';
log('trimStart()', JSON.stringify(t.trimStart())); // end still has spaces

section('Common pattern: detect prefixes ignoring indentation');

const line1 = '    # comment';
const line2 = '    command --flag';

const isComment = line1.trimStart().startsWith('#');
const isCommand = line2.trimStart().startsWith('command');

log('line1', JSON.stringify(line1));
log('isComment', isComment);

log('line2', JSON.stringify(line2));
log('isCommand', isCommand);

section('Done');
