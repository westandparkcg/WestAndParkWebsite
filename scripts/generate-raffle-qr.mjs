/* One-off generator: run `node scripts/generate-raffle-qr.mjs` whenever
   the raffle URL changes. Produces a static SVG so the flyer needs no
   runtime dependency or network call. */
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';

const URL_TO_ENCODE = 'https://westandparkcg.com/raffle.html';

const svg = await QRCode.toString(URL_TO_ENCODE, {
  type: 'svg',
  margin: 1,
  color: { dark: '#0B1D3A', light: '#FFFFFF' },
  errorCorrectionLevel: 'M',
});

writeFileSync('assets/raffle-qr.svg', svg);
console.log(`Generated assets/raffle-qr.svg for ${URL_TO_ENCODE}`);
