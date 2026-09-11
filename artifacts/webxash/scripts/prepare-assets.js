import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

const copyDirs = [
  { src: path.join(rootDir, 'node_modules/xash3d-fwgs/dist'), dest: path.join(rootDir, 'public/xash3d-fwgs') },
  { src: path.join(rootDir, 'node_modules/hlsdk-portable/dist'), dest: path.join(rootDir, 'public/hlsdk-portable') },
  { src: path.join(rootDir, 'node_modules/cs16-client/dist'), dest: path.join(rootDir, 'public/cs16-client') },
];

for (const { src, dest } of copyDirs) {
  if (fs.existsSync(src)) {
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`[prepare-assets] Copied ${src} -> ${dest}`);
    } catch (err) {
      console.warn(`[prepare-assets] Failed to copy ${src}:`, err);
    }
  }
}
