import { test, expect } from '@playwright/test'
import { getDashboardPage } from '../support/pages/dashboardPage'
import { getLoginPage } from '../support/pages/loginPage'
import { getToast } from '../support/pages/components/toast'
import { User, Users } from '../support/fixtures/User'

test('deve logar com sucesso', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)
    const dashboardPage = getDashboardPage(page)

    const user: User = Users.validUser

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(dashboardPage.welcome(`Olá, ${user.name}! 👋`)).toBeVisible()
    expect(await toast.getMessage()).toContain('Login realizado com sucesso!')

})

test('não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: User = Users.invalidPassword

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(await toast.getMessage())
        .toContain('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar com usuário não cadastrado', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: User = Users.nonExistentUser

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(await toast.getMessage())
        .toContain('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar com campos obrigatorios não preenchidos', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: User = Users.emptyFields

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('não deve logar com campo username não preenchido', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: User = Users.emptyUsername

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('não deve logar com campo password não preenchido', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user: User = Users.emptyPassword

    await loginPage.open()
    await loginPage.logInWith(user)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})
