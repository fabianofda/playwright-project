import { test, expect } from '@playwright/test'
import { getAuthActions } from '../support/actions/auth'
import { getToast } from '../support/actions/components/toast'
import { User, getLoginUser } from '../support/fixtures/users'
import { insertUser, removeUserByUserName } from '../support/database'

const user: User = getLoginUser()

test('deve logar com sucesso', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await removeUserByUserName(user.username)
    await insertUser(user)

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await auth.verifyUserLogin(user)

    await toast.getMessage('Login realizado com sucesso!')
})

test('não deve logar com senha incorreta', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({ ...user, password: 'senhaerrada' })

    await toast.getMessage('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('não deve logar com usuário não cadastrado', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({ ...user, username: 'usuarionaoexiste' })

    await toast.getMessage('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')

})

test('não deve logar com campos obrigatorios não preenchidos', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({ ...user, username: '', password: '' })

    await toast.getMessage('Campos obrigatóriosPor favor, preencha todos os campos.')

})

test('não deve logar com campo username não preenchido', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({ ...user, username: '' })

    await toast.getMessage('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('não deve logar com campo password não preenchido', async ({ page }) => {
    const auth = getAuthActions(page)
    const toast = getToast(page)

    await auth.navigateToLogin()
    await auth.doLogin({ ...user, password: '' })

    await toast.getMessage('Campos obrigatóriosPor favor, preencha todos os campos.')
})
