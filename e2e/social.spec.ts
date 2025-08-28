import { test} from '@playwright/test'
import { getAuthActions } from '../support/actions/auth'
import { getUserWithSocialMedia } from '../support/fixtures/users'
import { removeUserByUserName, insertUser } from '../support/database'
import { getSocialActions } from '../support/actions/social'
import {getToast} from "../support/actions/components/toast";


test('deve cadastrar o gitHub', async ({ page }) => {
    const auth = getAuthActions(page)
    const user = getUserWithSocialMedia()
    const social = getSocialActions(page)
    const toast = getToast(page)

    await removeUserByUserName(user.username)
    await insertUser(user)

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await auth.verifyUserLogin(user)

    await social.addSocialMedia('gitHub', user.socialMedia.gitHub)

    await toast.getMessage('GitHub adicionado com sucesso')    
})

test('deve cadastrar o linkdin', async ({ page }) => {
    const auth = getAuthActions(page)
    const user = getUserWithSocialMedia()
    const social = getSocialActions(page)
    const toast = getToast(page)

    await removeUserByUserName(user.username)
    await insertUser(user)

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await auth.verifyUserLogin(user)

    await social.addSocialMedia('linkedIn', user.socialMedia.linkedIn)

    await toast.getMessage('LinkedIn adicionado com sucesso')

})

test('deve cadastrar o instagram', async ({ page }) => {
    const auth = getAuthActions(page)
    const user = getUserWithSocialMedia()
    const social = getSocialActions(page)
    const toast = getToast(page)

    await removeUserByUserName(user.username)
    await insertUser(user)

    await auth.navigateToLogin()
    await auth.doLogin(user)
    await auth.verifyUserLogin(user)

    await social.addSocialMedia('instagram', user.socialMedia.instagram)

    await toast.getMessage('Instagram adicionado com sucesso')

})