/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_URL?: string;
  readonly VITE_SOCIALIFY_URL?: string;
  readonly VITE_SOCIALIFY_URL_PARAM?: string;
  readonly VITE_QUOTES_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

