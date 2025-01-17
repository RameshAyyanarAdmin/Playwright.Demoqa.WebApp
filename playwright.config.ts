import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // testDir: './tests',
  testDir: './',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: false, // Run in non-headless mode
    // launchOptions: {
    //   args: ['--start-maximized'], // Maximize the browser window
    // },
    // viewport: null, // Disable default viewport size
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        screenshot:"off",
        video:"off",
        trace:"off",
        viewport: {width:1536,height:730} 
      },
    },
  ],
});
