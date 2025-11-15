# ⚙️ React + TypeScript + Vite + ESLint + Prettier + Stylelint — Шаблон настройки проекта

## 📘 1. Установка React + TypeScript + Vite

npm install react react-dom
npm install --save-dev typescript vite @vitejs/plugin-react @types/react @types/react-dom

## 2. Настройка TypeScript (tsconfig.json)

{
"compilerOptions": {
"target": "esnext",
"useDefineForClassFields": true,
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": false,
"skipLibCheck": true,
"esModuleInterop": true,
"allowSyntheticDefaultImports": true,
"strict": true,
"forceConsistentCasingInFileNames": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"noEmit": true,
"jsx": "react-jsx"
},
"include": ["src"]
}

## 🧩 3. Настройка Vite (vite.config.ts)

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
server: {
port: 5173,
open: true,
},
});

## 🧠 4. ESLint + Prettier + Stylelint

npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier
npm install --save-dev prettier
npm install --save-dev stylelint stylelint-config-standard stylelint-order

## 🧾 5. Конфигурация ESLint (eslint.config.mjs)

import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
js.configs.recommended,
{
files: ['**/*.ts', '**/*.tsx'],
languageOptions: {
parser: typescriptParser,
globals: { ...globals.browser },
},
plugins: { '@typescript-eslint': typescriptPlugin, prettier: pluginPrettier },
rules: {
...typescriptPlugin.configs.recommended.rules,
'prettier/prettier': 'error',
'no-unused-vars': 'warn',
},
},
{ ignores: ['dist/', 'node_modules/', '*.config.js'] },
];

## 💅 6. Prettier (.prettierrc)

{
"semi": true,
"singleQuote": true,
"trailingComma": "es5",
"printWidth": 100,
"tabWidth": 2
}

# .prettierignore:

node_modules
dist
build
\*.config.js

## 🎨 7. Stylelint (.stylelintrc.json)

{
"extends": ["stylelint-config-standard"],
"plugins": ["stylelint-order"],
"rules": {
"selector-class-pattern": null,
"font-family-no-missing-generic-family-keyword": true
}
}

## 🧩 9. Базовые файлы

# index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

# src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<App />
</React.StrictMode>
);

# src/App.tsx

import React from 'react';

function App() {
return (

<div className="container">
<h1>My Portfolio</h1>
<p>Hello from React + TypeScript + Vite!</p>
</div>
);
}

export default App;

# src/styles.css

body {
margin: 0;
padding: 0;
font-family: 'Arial', sans-serif;
}

.container {
padding: 40px;
text-align: center;
}

## 📜 10. Скрипты в package.json

"scripts": {
"type-check": "tsc --noEmit",
"lint:js": "eslint src/**/\*.{ts,tsx}",
"lint:js:fix": "eslint src/**/_.{ts,tsx} --fix",
"lint:css": "stylelint src/\*\*/_.css",
"lint:css:fix": "stylelint src/**/\*.css --fix",
"format:check": "prettier --check src/**/_.{ts,tsx,css}",
"format:fix": "prettier --write src/\*\*/_.{ts,tsx,css}",
"lint": "npm run type-check && npm run lint:js && npm run lint:css && npm run format:check",
"lint:fix": "npm run type-check && npm run lint:js:fix && npm run lint:css:fix && npm run format:fix",
"test:integration": "npm run lint",
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview"
}

## ✅ 11. Проверка

npm run dev
