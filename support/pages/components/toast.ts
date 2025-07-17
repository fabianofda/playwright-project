import { Page } from '@playwright/test';

export function getToast(page: Page) {
    return {
        getMessage: async () => {
            return await page.locator('.toast').textContent()
        }
    }
}