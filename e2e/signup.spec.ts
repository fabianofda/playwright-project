import { test, expect } from '@playwright/test'
import { getSignupPage } from '../support/pages/SignupPage'
import { getDashboardPage } from '../support/pages/DashboardPage'
import { getToast } from '../support/pages/components/Toast'
import { getWarning } from '../support/pages/components/Warning'
import { UserSignup, Users, getNewUser, getDuplicateUser } from '../support/fixtures/Users'

import { removeUserByEmail, insertUser, removeUserByUserName } from '../support/database'

test(' deve realiza cadastro com sucesso', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const dashboardPage = getDashboardPage(page)
  const toast = getToast(page)

  const data: UserSignup = getNewUser()
  await removeUserByEmail(data.email)

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(dashboardPage.welcome(`Olá, ${data.name}! 👋`)).toBeVisible()

  expect(await toast.getMessage())
    .toContain('Conta criada com sucesso!')

  expect(await toast.getMessage())
    .toContain('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('deve validar quando as senhas nao coicidirem', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.passwordMismatch

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('A confirmação de senha deve ser igual à senha.')
})

test('deve validar quando as senhas for muito curta', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.shortPassword

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('A senha deve ter pelo menos 6 caracteres.')
})

test('deve validar quando campo como voce gostaria de ser chamado? nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.emptyName

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo escolha um username unico nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.useSignupEmpyt

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo username for invalido', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.invalidUsername

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('O username deve conter apenas letras, números e underscores.')
})

test('deve validar quando campo seu melhor email nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = Users.emptyEmail

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar campos obrigatorios', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('nao deve cadastrar quando email ja estiver em uso', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = getDuplicateUser()
  await removeUserByEmail(data.email)
  await insertUser(data)

  await signupPage.open()
  await signupPage.register({...data, username: 'novoUsername'})
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Oops!Parece que esse e-mail ou nome de usuário já foi cadastrado. Tente outro, por favor.')
})

test('nao deve cadastrar quando username ja estiver em uso', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: UserSignup = getDuplicateUser()
  await removeUserByUserName(data.username)
  await insertUser(data)

  await signupPage.open()
  await signupPage.register({ ...data, email: 'novo@novo.com' })
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Oops!Parece que esse e-mail ou nome de usuário já foi cadastrado. Tente outro, por favor.')
})

test('deve validar quando campo email for invalido', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const warning = getWarning(page)

  const data: UserSignup = Users.invalidEmail

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()


  expect(await warning.getEmailFieldBrowserAlertMessage())
    .toBe(`Please include an '@' in the email address. 'teste' is missing an '@'.`)
})

test('deve validar quando o tipo do campo for "email".', async ({ page }) => {

  const signupPage = getSignupPage(page)

  const data: UserSignup = Users.invalidEmail

  await signupPage.open()
  await signupPage.register(data)
  await signupPage.submit()

  // Verifica se o campo de email tem o tipo correto
  await signupPage.getAttributeTypeEmail()
})