/**
 * matchAll.ts (String.prototype.matchAll)
 *
 * Mental model:
 * - Get ALL matches of a RegExp, including capture groups
 * - Returns an iterator of match objects
 *
 * Signature:
 *   str.matchAll(regexpWithGlobalFlag) => IterableIterator<RegExpMatchArray>
 *
 * Notes:
 * - RegExp MUST be global (/g), otherwise it throws
 * - Each yielded match includes:
 *   - [0] full match
 *   - capture groups
 *   - index (as property)
 *   - input (as property)
 *
 * Use when:
 * - you need all matches + capture groups + indices
 */

function section(title: string) {
  console.log(`\n=== ${title} ===`);
}

function log(label: string, value: unknown) {
  console.log(`${label}:`, value);
}

section('All matches + groups');

const s = 'Order #A12 costs 35 USD. Order #B07 costs 50 USD.';
const re = /Order\s+#([A-Z])(\d+)\s+costs\s+(\d+)\s+USD/g;

const iter = s.matchAll(re);
const matches = Array.from(iter);

log('matches.length', matches.length);

for (const m of matches) {
  const [full, letter, code, price] = m;
  const idx = (m as any).index as number | undefined;

  console.log({
    full,
    letter,
    code,
    price: Number(price),
    index: idx,
  });
}

section('Extract structured data (map)');

type Order = { prefix: string; code: number; price: number; index?: number };

const orders: Order[] = matches.map((m) => ({
  prefix: m[1]!, // letter
  code: Number(m[2]!),
  price: Number(m[3]!),
  index: (m as any).index,
}));

log('orders', orders);

section('RegExp MUST be global (throws otherwise)');

try {
  // @ts-expect-error demo runtime behavior
  const bad = Array.from(s.matchAll(/Order\s+#([A-Z])(\d+)/)); // missing /g
  log('bad', bad);
} catch (err) {
  log('matchAll without /g throws', (err as Error).message);
}

section('Trigger');

log('trigger', 'matchAll(/.../g) -> all matches + groups + indices (iterator)');
log('trigger', 'match(/.../g)    -> all matches (strings only)');

section('Done');
