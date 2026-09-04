declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      CI: boolean;
      NEXT_PUBLIC_API_BASE_URL?: string;
    }
  }
}

export {};
