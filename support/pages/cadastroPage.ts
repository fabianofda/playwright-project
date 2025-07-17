import { Page } from "@playwright/test"

interface fields {
    nome?: string
    username?: string
    email?: string
    senha?: string
    confirmaSenha?: string
}

export function getCadastroPage(page: Page) {
    return {
        open: async () => {
            await page.goto('http://localhost:3000/cadastro')
        },
        register: async (data: fields) => {
            if (data.nome) await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(data.nome)
            if (data.username) await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(data.username)
            if (data.email) await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(data.email)
            if (data.senha) await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill(data.senha)
            if (data.confirmaSenha) await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill(data.confirmaSenha)
            await page.getByRole('button', { name: 'Criar conta' }).click()
        }
    }
}