import { Page } from "@playwright/test"
import { Fields } from "../fixtures/IFields"

export function getCadastroPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        register: async (data: Fields) => {
            await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(data.nome)
            await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(data.username)
            await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(data.email)
            await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill(data.senha)
            await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill(data.confirmaSenha)
            await page.getByRole('button', { name: 'Criar conta' }).click()
        }
    }
}