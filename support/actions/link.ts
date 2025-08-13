import { Page, expect } from '@playwright/test'

export function getLinkActions(page: Page) {

    return {
        openModal: async () => {
            await page.getByRole('button', { name: 'Adicionar' }).first().click()
            await expect(page.getByRole('heading', { name: 'Adicionar Novo Link' })).toBeVisible()
        },
        submitLinkForm: async (title: string, url: string) => {
            await page.getByRole('textbox', { name: 'Nome do Link' }).fill(title)
            await page.getByRole('textbox', { name: 'URL' }).fill(url)

            await page.getByRole('button', { name: 'Adicionar Link' }).click()
        }
    }
}