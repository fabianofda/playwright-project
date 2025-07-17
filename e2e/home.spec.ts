import { test, expect } from '@playwright/test';

import { getHomePage } from '../support/pages/homePage';

test('deve validar o título da pagina', async ({ page }) => {
  const homePage = getHomePage(page);

  await homePage.open();

  expect(await homePage.getTitle()).toMatch('Linkaí by Papito');
});