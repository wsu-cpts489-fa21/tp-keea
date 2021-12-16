/* import {test, expect} from "@playwright/test";

test('Update round test with mouse clicks', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@mail.co'); // Only works for my configuration
    await page.fill('#password', 'Test3r!!!'); // Again, only works for my configuration
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    await page.click('#roundsTable >> css=tbody >> css=tr >> nth=0 >> css=td >> nth=3 >> button');
    await page.fill('#roundCourse', 'Charliotta');
    await page.click('#logRoundForm >> .mode-page-btn-container >> button >> nth=0');
    const roundTitle = page.locator('#roundsTable >> tbody >> tr >> nth=0 >> td >> nth=1');
    await expect(roundTitle).toHaveText('Charliotta');
})

test('Update round test with keyboard input', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('test@mail.co', {delay: 100}); // Only works for my configuration
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test3r!!!', {delay: 100});  // Again, only works for my configuration
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 5 Tab presses to get to mode-bar
    await page.click('#roundsMode'); // There is no keyboard interface for navigating round-mode buttons
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 5 Tab presses to get to the first edit-button
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 4 Tab presses to get to the name field
    await page.keyboard.type('Marriota', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 8 Tab presses to get to the submit button
    await page.keyboard.press('Enter');
}); */