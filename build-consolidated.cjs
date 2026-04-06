const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/toast');

const files = [
  'types.ts',
  'themes.ts',
  'animations.ts',
  'store.ts',
  'Toast.tsx',
  'Toaster.tsx'
];

let consolidated = `/**
 * @author shuakami
 * @repository github.com/shuakami/toast
 */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';\n\n`;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  // Remove imports
  const cleaned = content.replace(/^import\s+.*?from\s+['"].*?['"];?\n/gm, '');
  consolidated += `${cleaned}\n`;
}

// Remove any remaining imports (like multi-line ones)
let finalContent = consolidated.replace(/import\s+{[\s\S]*?}\s+from\s+['"].*?['"];?\n/g, '');

const escapedContent = finalContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

const output = `export const toastSourceCode = \`${escapedContent}\`;\n`;

fs.mkdirSync(path.join(__dirname, 'src/lib'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'src/lib/toast-source.ts'), output);
console.log('Consolidated source generated.');
