import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/browser',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:8081',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                launchOptions: {
                    executablePath: '/usr/bin/chromium-browser',
                },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                launchOptions: {
                    executablePath: '/usr/bin/firefox',
                },
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                launchOptions: {
                    executablePath: '/usr/bin/webkit2gtk',
                },
            },
        },
    ],
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:8081',
        reuseExistingServer: !process.env.CI,
    },
});
