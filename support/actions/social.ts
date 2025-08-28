import { Page, expect } from '@playwright/test'

const eSocialMedia = {
    gitHub: 0,
    linkedIn: 1,
    instagram: 2
}
type SocialMedia = 'gitHub' | 'linkedIn' | 'instagram'

export function getSocialActions(page: Page) {

    return {

        addSocialMedia: async (socialMedia: SocialMedia, username: string) => {

            const socialCard = page.locator('.bg-card:has-text("Redes Sociais")')

            const index = eSocialMedia[socialMedia]

            await socialCard
                .getByRole('button', { name: 'Adicionar' })
                .nth(index)
                .click()

            await expect(page.getByRole('heading', { name: `Adicionar ${socialMedia}` })).toBeVisible()

            await page.getByPlaceholder(`Seu username no ${socialMedia}`).fill(username)
            await page.getByRole('button', { name: 'Salvar' }).click()
        }
    }
}