/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly BASE_API:string;
}

interface ImportMeta {
 readonly env: ImportMetaEnv;
}