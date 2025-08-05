import { Page, expect } from "@playwright/test"
import { UserSignup } from "../fixtures/Users"

export function getSignupPage(page: Page) {

    const emailField = () => {
        return page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
    }

    return {
        open: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        register: async (data: UserSignup) => {
            await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(data.name)
            await page.getByRole('textbox', { name: 'Escolha um @username único (ex: papitotechqa)' }).fill(data.username)
            await emailField().fill(data.email)
            await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill(data.senha)
            await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill(data.confirmaSenha)
        },
        submit: async () => {
            await page.getByRole('button', { name: 'Criar conta' }).click()
        },
        emailField,
        getAttributeTypeEmail: async () => {
            await expect(emailField()).toHaveAttribute('type', 'email')
        }

    }
}
