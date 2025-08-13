import { test, expect } from '@playwright/test'
import { getAuthActions } from '../support/actions/auth'
import { getToast } from '../support/actions/components/toast'
import { User, getNewUser, getDuplicateUser } from '../support/fixtures/users'
import { removeUserByEmail, insertUser, removeUserByUserName } from '../support/database'

const user: User = getNewUser()

test(' deve realiza cadastro com sucesso', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await removeUserByEmail(user.email)

  await auth.navigateToSignup()
  await auth.fillSignupForm(user)
  await auth.submitSignupForm()
  await auth.verifyUserLogin(user)

  await toast.getMessage('Conta criada com sucesso!')
  await toast.getMessage('Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('deve validar quando as senhas nao coicidirem', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, confirmapassword: '123456' })
  await auth.submitSignupForm()

  await toast.getMessage('A confirmação de senha deve ser igual à senha.')
})

test('deve validar quando as senhas for muito curta', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, password: '123' })
  await auth.submitSignupForm()

  await toast.getMessage('A senha deve ter pelo menos 6 caracteres.')
})

test('deve validar quando campo como voce gostaria de ser chamado? nao for informado', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, name: '' })
  await auth.submitSignupForm()

  await toast.getMessage('Por favor, preencha todos os campos.')
})

test('deve validar quando campo escolha um username unico nao for informado', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, username: '' })
  await auth.submitSignupForm()

  await toast.getMessage('Por favor, preencha todos os campos.')
})

test('deve validar quando campo username for invalido', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, username: 'fabiano fda' })
  await auth.submitSignupForm()

  await toast.getMessage('O username deve conter apenas letras, números e underscores.')
})

test('deve validar quando campo seu melhor email nao for informado', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, email: '' })
  await auth.submitSignupForm()

  await toast.getMessage('Por favor, preencha todos os campos.')
})

test('deve validar campos obrigatorios', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.submitSignupForm()

  await toast.getMessage('Por favor, preencha todos os campos.')
})

test('nao deve cadastrar quando email ja estiver em uso', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  const data: User = getDuplicateUser()
  await removeUserByEmail(data.email)
  await insertUser(data)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...data, username: 'novoUsername' })
  await auth.submitSignupForm()

  await toast.getMessage('Parece que esse e-mail ou nome de usuário já foi cadastrado. Tente outro, por favor.')
})

test('nao deve cadastrar quando username ja estiver em uso', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  const data: User = getDuplicateUser()
  await removeUserByUserName(data.username)
  await insertUser(data)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...data, email: 'novo@novo.com' })
  await auth.submitSignupForm()

  await toast.getMessage('Parece que esse e-mail ou nome de usuário já foi cadastrado. Tente outro, por favor.')
})

test('deve validar quando campo email for invalido', async ({ page }) => {
  const auth = getAuthActions(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, email: 'teste' })
  await auth.submitSignupForm()

  expect(await auth.getEmailFieldBrowserAlertMessage())
    .toBe(`Please include an '@' in the email address. 'teste' is missing an '@'.`)
})

test('deve validar quando o tipo do campo for "email".', async ({ page }) => {
  const auth = getAuthActions(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, email: 'teste' })
  await auth.submitSignupForm()

  // Verifica se o campo de email tem o tipo correto
  await auth.validateEmailFieldType()
})

test('deve validar quando username for muito curto', async ({ page }) => {
  const auth = getAuthActions(page)
  const toast = getToast(page)

  await auth.navigateToSignup()
  await auth.fillSignupForm({ ...user, username: 'a' })
  await auth.submitSignupForm()

  await toast.getMessage('O username deve ter pelo menos 3 caracteres.')
})