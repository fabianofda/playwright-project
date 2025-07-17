import { Page } from '@playwright/test'

export function getHomePage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/')
        },
        getTitle: async () => {
           return await page.title()
        }
    }
}