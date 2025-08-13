import { test } from '@playwright/test'
import { getAuthActions } from '../support/actions/auth'
import { getLinkActions } from '../support/actions/link'
import { User, getTempUser } from '../support/fixtures/users'
import { removeUserByUserName, insertUser, removeLinks } from '../support/database'
import { getToast } from '../support/actions/components/toast'


test('deve cadastrar um novo link', async ({ page }) => {
    const auth = getAuthActions(page)
    const link = getLinkActions(page)
    const toast = getToast(page)

    const user: User = getTempUser()

    await removeUserByUserName(user.username)
    await insertUser(user)
    await removeLinks('fda.dev')

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await link.openModal()
    await link.submitLinkForm('meu projeto', 'https://fda.dev/lnks')

    await toast.getMessage('Link adicionado com sucesso.')
})