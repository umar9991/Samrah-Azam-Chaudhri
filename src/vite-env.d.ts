/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLOODFLOW_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
