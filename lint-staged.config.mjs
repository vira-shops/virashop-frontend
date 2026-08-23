const config = {
  '**/*.{js,jsx,ts,tsx,json,css,scss}': ['prettier --write'],
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
};

export default config;
