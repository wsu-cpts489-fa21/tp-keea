import {test, expect} from "@playwright/test";

test('basic test', async ({page}) => {
    await page.goto('http://localhost:8080');
    await page.fill('#email', 'gooba@mail.co'); // Only works for my configuration
    await page.fill('#password', 'Breakfast12!'); // Again, only works for my configuration
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    await page.click('#roundsTable >> css=tbody >> css=tr >> nth=0 >> css=td >> nth=3 >> button');
    await page.fill('#roundCourse', 'Charliotta');
    await page.click('#logRoundForm >> .mode-page-btn-container >> button >> nth=0');
    const roundTitle = page.locator('#roundsTable >> tbody >> tr >> nth=0 >> td >> nth=1');
    await expect(roundTitle).toHaveText('Charliotta');
})