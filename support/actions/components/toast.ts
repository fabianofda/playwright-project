import { expect, Page } from '@playwright/test';

export function getToast(page: Page) {
    return {
        getMessage: async (texto: string) => {
            const toast = page.locator('.toast')

            await expect(toast).toContainText(texto)
        }
    }
}