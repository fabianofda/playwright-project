import { test, expect } from '@playwright/test'
import { getAuthActions} from '../support/actions/auth'

test('deve validar o título da pagina', async ({ page }) => {
  const homePage = getAuthActions(page)

  await homePage.open()

  expect(await homePage.getTitle()).toMatch('Linkaí by Papito')
})