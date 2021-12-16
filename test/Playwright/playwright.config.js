// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    use: {
      launchOptions: {
        slowMo: 800,
      },
      headless: false,
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
      video: 'on-first-retry',
    },
  };
  
export default config;