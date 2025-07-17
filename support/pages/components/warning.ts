
import { Page } from '@playwright/test';

export function getWarning(page: Page) {
    return {
        getEmailFieldBrowserAlertMessage: async () => {
            return await page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
                .evaluate((input: HTMLInputElement) => {
                    input.checkValidity()
                    return input.validationMessage
                })
        }
    }
}