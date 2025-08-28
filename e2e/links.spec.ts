import { test } from '@playwright/test'
import { getAuthActions } from '../support/actions/auth'
import { getLinkActions } from '../support/actions/link'
import { User, getUserWithLink, getUserWithLinks } from '../support/fixtures/users'
import { removeUserByUserName, insertUser, removeLinks } from '../support/database'
import { getToast } from '../support/actions/components/toast'


test('deve cadastrar um novo link', async ({ page }) => {
    const auth = getAuthActions(page)
    const link = getLinkActions(page)
    const toast = getToast(page)

    const user: User = getUserWithLink()

    await removeUserByUserName(user.username)
    await insertUser(user)
    await removeLinks('andrade.dev')

    await auth.navigateToLogin()
    await auth.doLogin(user)

    if (user.links) {
        for (const l of user.links) {
            await link.openModal()
            await link.submitLinkForm(l)

            await toast.getMessage('Link adicionado com sucesso.')
        }
    }
})

test('deve cadastrar multiplos links', async ({ page }) => {
    const auth = getAuthActions(page)
    const link = getLinkActions(page)
    const toast = getToast(page)

    const user: User = getUserWithLinks()

    await removeUserByUserName(user.username)
    await insertUser(user)
    await removeLinks('dias.dev')

    await auth.navigateToLogin()
    await auth.doLogin(user)

    if (user.links) {
        for (const l of user.links) {
            await link.openModal()
            await link.submitLinkForm(l)

            await toast.getMessage('Link adicionado com sucesso.')
        }
    }
})