import { test, expect } from '@playwright/test';

test.describe('Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display calculator interface', async ({ page }) => {
        // Check if calculator elements are present
        await expect(page.getByRole('textbox')).toBeVisible();
        await expect(page.getByRole('button', { name: '1' })).toBeVisible();
        await expect(page.getByRole('button', { name: '+' })).toBeVisible();
        await expect(page.getByRole('button', { name: '=' })).toBeVisible();
    });

    test('should perform basic addition', async ({ page }) => {
        // Click buttons to perform 2 + 2
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '+' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '=' }).click();

        // Check the result
        await expect(page.getByRole('textbox')).toHaveValue('4');
    });

    test('should handle decimal numbers', async ({ page }) => {
        // Click buttons to perform 3.14 + 2.86
        await page.getByRole('button', { name: '3' }).click();
        await page.getByRole('button', { name: '.' }).click();
        await page.getByRole('button', { name: '1' }).click();
        await page.getByRole('button', { name: '4' }).click();
        await page.getByRole('button', { name: '+' }).click();
        await page.getByRole('button', { name: '2' }).click();
        await page.getByRole('button', { name: '.' }).click();
        await page.getByRole('button', { name: '8' }).click();
        await page.getByRole('button', { name: '6' }).click();
        await page.getByRole('button', { name: '=' }).click();

        // Check the result
        await expect(page.getByRole('textbox')).toHaveValue('6');
    });
});
