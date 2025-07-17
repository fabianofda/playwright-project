import { test, expect } from '@playwright/test'

import { getDashboardPage } from '../support/pages/dashboardPage'
import { getLoginPage } from '../support/pages/loginPage'

import { getToast } from '../support/pages/components/toast';


test('deve logar com sucesso', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)
    const dashboardPage = getDashboardPage(page)

    const user = { name: 'fabianofda', username: 'fabianofda', password: 'fda123' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(dashboardPage.welcome(`Olá, ${user.name}! 👋`)).toBeVisible()
    expect(await toast.getMessage()).toContain('Login realizado com sucesso!')

})

test('não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = { username: 'fabianofda', password: 'deuruim123' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(await toast.getMessage())
        .toContain('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar com usuário não cadastrado', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = { username: 'naoexisto', password: '123456' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(await toast.getMessage())
        .toContain('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar com campos obrigatorios não preenchidos', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = { username: '', password: '' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('não deve logar com campo username não preenchido', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = { username: '', password: 'fda123' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('não deve logar com campo password não preenchido', async ({ page }) => {
    const loginPage = getLoginPage(page)
    const toast = getToast(page)

    const user = { username: 'fabianofda', password: '' }

    await loginPage.open()
    await loginPage.logInWith(user.username, user.password)

    expect(await toast.getMessage())
        .toContain('Campos obrigatóriosPor favor, preencha todos os campos.')
})
