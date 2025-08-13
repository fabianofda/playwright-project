import { Page, expect } from '@playwright/test'
import { User } from '../fixtures/users'

export function getAuthActions(page: Page) {

    const emailField = () => {
        return page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
    }

    return {
        open: async () => {
            await page.goto('http://localhost:3000/')
        },
        getTitle: async () => {
            return await page.title()
        },
        navigateToLogin: async () => {
            await page.goto('http://localhost:3000/login')
        },
        doLogin: async (user: User) => {
            await page
                .getByRole('textbox', { name: 'Seu @username incrível' })
                .fill(user.username)

            await page
                .getByRole('textbox', { name: 'Digite sua senha secreta' })
                .fill(user.password)

            await page
                .getByRole('button', { name: 'Entrar' })
                .click()
        },
        verifyUserLogin: async (user: User) => {
            const title = page.locator('h1')
            await expect(title).toContainText(`Olá, ${user.name}! 👋`)
        },

        navigateToSignup: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        fillSignupForm: async (data: User) => {
            await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(data.name)
            await page.getByRole('textbox', { name: 'Escolha um @username único (ex: papitotechqa)' }).fill(data.username)
            await emailField().fill(data.email)
            await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill(data.password)
            await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill(data.confirmapassword)
        },
        submitSignupForm: async () => {
            await page.getByRole('button', { name: 'Criar conta' }).click()
        },
        emailField,
        validateEmailFieldType: async () => {
            await expect(emailField()).toHaveAttribute('type', 'email')
        },
        getEmailFieldBrowserAlertMessage: async () => {
            return await page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
                .evaluate((input: HTMLInputElement) => {
                    input.checkValidity()
                    return input.validationMessage
                })
        }
    }
}