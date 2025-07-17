import { test, expect } from '@playwright/test'

import { getCadastroPage } from '../support/pages/cadastroPage'
import { getDashboardPage } from '../support/pages/dashboardPage'

import { getToast } from '../support/pages/components/toast'
import { getWarning } from '../support/pages/components/warning'

test(' deve realiza cadastro com sucesso', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const dashboardPage = getDashboardPage(page)
  const toast = getToast(page)

  const name = `teste_${Math.floor(Math.random() * 10000)}`
  
  const data = {
    nome: name,
    username: name,
    email: name + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(dashboardPage.welcome(`Olá, ${data.nome}! 👋`)).toBeVisible()

  expect(await toast.getMessage())
    .toContain('Conta criada com sucesso!')

  expect(await toast.getMessage())
    .toContain('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('deve validar quando as senhas nao coicidirem', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: nome,
    username: nome,
    email: nome + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste321'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('A confirmação de senha deve ser igual à senha.')
})

test('deve validar quando as senhas for muito curta', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: nome,
    username: nome,
    email: nome + '@teste.ai',
    senha: 'teste',
    confirmaSenha: 'teste'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('A senha deve ter pelo menos 6 caracteres.')
})

test('deve validar quando campo como voce gostaria de ser chamado? nao for informado', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    username: nome,
    email: nome + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo escolha um username unico nao for informado', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: nome,
    email: nome + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo username for invalido', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: nome,
    username: 't!-s-t#',
    email: nome + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('O username deve conter apenas letras, números e underscores.')
})

test('deve validar quando campo seu melhor email nao for informado', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const data = {
    nome: 'teste',
    username: 'teste',
    senha: 'teste111',
    confirmaSenha: 'teste111'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar campos obrigatorios', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const data = {
    nome: '',
    username: '',
    senha: '',
    confirmaSenha: ''
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando email ja existir', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const nome = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: nome,
    username: nome,
    email: 'fabianofda@linkai.com',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('User with that email or username already exists')
})

test('deve validar quando username ja existir', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const toast = getToast(page)

  const mail = `teste_${Math.floor(Math.random() * 10000)}`

  const data = {
    nome: 'fabianofda',
    username: 'fabianofda',
    email: mail + '@teste.ai',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await toast.getMessage())
    .toContain('User with that email or username already exists')
})

test('deve validar quando campo email for invalido', async ({ page }) => {

  const cadastroPage = getCadastroPage(page)
  const warning = getWarning(page)

  const data = {
    nome: 'ttesste',
    username: 'ttesste',
    email: 'teste',
    senha: 'teste123',
    confirmaSenha: 'teste123'
  }

  await cadastroPage.open()
  await cadastroPage.register(data)

  expect(await warning.getEmailFieldBrowserAlertMessage())
    .toBe(`Please include an '@' in the email address. 'teste' is missing an '@'.`)
})