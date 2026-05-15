import { readFileSync, writeFileSync } from 'fs';

const path = new URL('./src/components/Header.astro', import.meta.url).pathname.slice(1);
let src = readFileSync(path, 'utf8');

// 1. Add DRUMBEAT to top of wellness array
src = src.replace(
  `const wellness = [
  { label: 'Sound Journeys', href: '/sound-journeys', desc: 'Meditative rhythm experiences' },`,
  `const wellness = [
  { label: 'DRUMBEAT', href: '/drumbeat', desc: 'Evidence-based drumming programme' },
  { label: 'Sound Journeys', href: '/sound-journeys', desc: 'Meditative rhythm experiences' },`
);

// 2. Remove desktop DRUMBEAT standalone link
src = src.replace(
  `\n      <!-- DRUMBEAT standalone -->
      <a
        href="/drumbeat"
        class:list={['nav-link', isActive('/drumbeat') && 'is-active']}
      >
        DRUMBEAT
      </a>\n`,
  '\n'
);

// 3. Remove mobile DRUMBEAT standalone ul
src = src.replace(
  `    <!-- DRUMBEAT standalone -->
    <ul class="flex flex-col gap-1 mb-8">
      <li>
        <a href="/drumbeat" class="flex items-center justify-between py-3 border-b border-white/10 group">
          <span class="font-heading text-2xl font-light text-cream/80 group-hover:text-cream transition-colors">DRUMBEAT</span>
          <svg class="w-5 h-5 text-sage-light opacity-40 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </li>
    </ul>\n\n`,
  ''
);

writeFileSync(path, src, 'utf8');
console.log('Header patched');
