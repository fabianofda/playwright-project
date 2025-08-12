import { test, expect } from '@playwright/test'
import { getSignupPage } from '../support/pages/SignupPage'
import { getDashboardPage } from '../support/pages/DashboardPage'
import { getToast } from '../support/pages/components/Toast'
import { getWarning } from '../support/pages/components/Warning'
import { User, getNewUser, getDuplicateUser } from '../support/fixtures/Users'
import { removeUserByEmail, insertUser, removeUserByUserName } from '../support/database'

const user: User = getNewUser()

test(' deve realiza cadastro com sucesso', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const dashboardPage = getDashboardPage(page)
  const toast = getToast(page)

  await removeUserByEmail(user.email)

  await signupPage.open()
  await signupPage.register(user)
  await signupPage.submit()


  expect(dashboardPage.welcome(`Olá, ${user.name}! 👋`)).toBeVisible()

  expect(await toast.getMessage())
    .toContain('Conta criada com sucesso!')

  expect(await toast.getMessage())
    .toContain('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('deve validar quando as senhas nao coicidirem', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, confirmapassword: '123456' })
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('A confirmação de senha deve ser igual à senha.')
})

test('deve validar quando as senhas for muito curta', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, password: '123' })
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('A senha deve ter pelo menos 6 caracteres.')
})

test('deve validar quando campo como voce gostaria de ser chamado? nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, name: '' })
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo escolha um username unico nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, username: '' })
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Por favor, preencha todos os campos.')
})

test('deve validar quando campo username for invalido', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, username: 'fabiano fda' })
  await signupPage.submit()


  expect(await toast.getMessage())
    .toContain('O username deve conter apenas letras, números e underscores.')
})

test('deve validar quando campo seu melhor email nao for informado', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, email: '' })
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

  const data: User = getDuplicateUser()
  await removeUserByEmail(data.email)
  await insertUser(data)

  await signupPage.open()
  await signupPage.register({ ...data, username: 'novoUsername' })
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Oops!Parece que esse e-mail ou nome de usuário já foi cadastrado. Tente outro, por favor.')
})

test('nao deve cadastrar quando username ja estiver em uso', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  const data: User = getDuplicateUser()
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

  await signupPage.open()
  await signupPage.register({ ...user, email: 'teste' })
  await signupPage.submit()


  expect(await warning.getEmailFieldBrowserAlertMessage())
    .toBe(`Please include an '@' in the email address. 'teste' is missing an '@'.`)
})

test('deve validar quando o tipo do campo for "email".', async ({ page }) => {

  const signupPage = getSignupPage(page)

  await signupPage.open()
  await signupPage.register({ ...user, email: 'teste' })
  await signupPage.submit()

  // Verifica se o campo de email tem o tipo correto
  await signupPage.getAttributeTypeEmail()
})

test('deve validar quando username for muito curto', async ({ page }) => {

  const signupPage = getSignupPage(page)
  const toast = getToast(page)

  await signupPage.open()
  await signupPage.register({ ...user, username: 'a' })
  await signupPage.submit()

  expect(await toast.getMessage())
    .toContain('Username muito curtoO username deve ter pelo menos 3 caracteres.')
})