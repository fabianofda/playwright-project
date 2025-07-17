import { Page } from '@playwright/test'

export function getDashboardPage(page: Page) {
    return {
        welcome: (username: string) => {
            return page.getByRole('heading', { name: username })
        }
    }
}