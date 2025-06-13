import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/browser',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:8080',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'python3 -m http.server 8080 --directory src',
        url: 'http://localhost:8080',
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: 'chromium',
            use: {
                launchOptions: {
                    executablePath: '/usr/bin/chromium-browser',
                    args: ['--no-sandbox', '--headless']
                }
            }
        }
    ],
});
