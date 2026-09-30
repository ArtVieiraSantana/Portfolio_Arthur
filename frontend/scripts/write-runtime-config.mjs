import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultApiUrl = 'https://portfolio-arthur-api.onrender.com/api';
const configuredApiUrl = process.env.API_URL?.trim() || defaultApiUrl;

let parsedApiUrl;
try {
  parsedApiUrl = new URL(configuredApiUrl);
} catch {
  throw new Error('API_URL deve ser uma URL absoluta, por exemplo https://portfolio-arthur-api.onrender.com/api');
}

if (!['http:', 'https:'].includes(parsedApiUrl.protocol)) {
  throw new Error('API_URL deve usar o protocolo http ou https.');
}

const apiUrl = parsedApiUrl.toString().replace(/\/+$/, '');
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(scriptDirectory, '../public');
const outputFile = resolve(outputDirectory, 'runtime-config.js');

await mkdir(outputDirectory, { recursive: true });
await writeFile(
  outputFile,
  `window.__PORTFOLIO_CONFIG__ = ${JSON.stringify({ apiUrl })};\n`,
  'utf8'
);

console.log(`Configuração pública da API gerada: ${apiUrl}`);
