import {test, expect} from '@playwright/test'

test('Google OAuth Login with Mouse', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.click('.btn-google');
    await page.type('#identifierId', 'elisha.aguilera@wsu.edu');
    await page.click('#identifierNext');
    await page.type('#password', process.env.SPECIAL_GOOGLE_PASSWORD);
    await page.click('#passwordNext');
    await expect(page.locator('#profileBtn')).toHaveAttribute('style', 'background-image: url("https://lh3.googleusercontent.com/a/AATXAJwScskOAqRmNzGlyp_F7Riv85I_EZXvE5FwAD2T=s96-c");') // Expect profile banner to change
});

test('Google OAuth Login with Keyboard', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 8 Tab presses to get to login with Google OAuth
    await page.waitForTimeout(2000);
    await page.keyboard.press('Enter');
    // wait for 1 second
    await page.waitForTimeout(2000);
    await page.keyboard.type('elisha.aguilera@wsu.edu', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 2 Tab presses to get to next button
    await page.keyboard.press('Enter');
    // wait for 1 second
    await page.waitForTimeout(2000);
    await page.keyboard.type(process.env.SPECIAL_GOOGLE_PASSWORD, {delay: 100})
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 2 Tab presses to get to next button
    await page.keyboard.press('Enter');
    await expect(page.locator('#profileBtn')).toHaveAttribute('style', 'background-image: url("https://lh3.googleusercontent.com/a/AATXAJwScskOAqRmNzGlyp_F7Riv85I_EZXvE5FwAD2T=s96-c");')  // Expect profile banner to change
});