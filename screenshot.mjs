import puppeteer from 'puppeteer';
import { mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const label = process.argv[2] ?? 'screenshot';
const outputDir = join(__dirname, 'screenshots');
const outputPath = join(outputDir, `${label}.png`);

await mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:4321', { waitUntil: 'networkidle2' });
await page.screenshot({ path: outputPath, fullPage: true });

await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
