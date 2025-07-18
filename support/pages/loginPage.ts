import { Page } from '@playwright/test'
import { User } from '../fixtures/IUser'

export function getLoginPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/login')
        },
        logInWith: async (user: User) => {
            await page
                .getByRole('textbox', { name: 'Seu @username incrível' })
                .fill(user.username)

            await page
                .getByRole('textbox', { name: 'Digite sua senha secreta' })
                .fill(user.password)

            await page
                .getByRole('button', { name: 'Entrar' })
                .click()
        }
    }
}