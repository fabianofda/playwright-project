import { Page } from '@playwright/test'
import { UserLogin } from '../fixtures/Users'

export function getLoginPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/login')
        },
        logInWith: async (user: UserLogin) => {
            await page
                .getByRole('textbox', { name: 'Seu @username incrível' })
                .fill(user.username)

            await page
                .getByRole('textbox', { name: 'Digite sua senha secreta' })
                .fill(user.senha)

            await page
                .getByRole('button', { name: 'Entrar' })
                .click()
        }
    }
}