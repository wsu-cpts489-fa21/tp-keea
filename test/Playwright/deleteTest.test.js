import {test, expect} from "@playwright/test";

test('Delete mouse input test', async ({page}) => {
    // Stub for delete process with mouse inputs
    await page.goto('http://localhost:8081/');
    await page.fill('#email', 'test@mail.co');
    await page.fill('#password', 'Test3r!!!');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    await page.click('#roundsTable >> css=tbody >> css=tr >> nth=0 >> css=td >> nth=4 >> button'); // Get the delete button for the first entry
    await page.click('#YesBtn');
    const roundDescription = page.locator('#roundsTableCaption');
    await expect(roundDescription).toHaveText('Table displaying 0 speedgolf rounds');
    // Resets and adds the round back
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Marriotta');
    await page.click('#logRoundForm >> .mode-page-btn-container >> button >> nth=0');
});

test('Delete keyboard input test', async ({page}) => {
    // Stub for delete process with keyboard inputs
    await page.goto('http://localhost:8081/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('test@mail.co', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test3r!!!', {delay: 100});
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
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 6 Tab presses to get to delete button
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 8 Tab presses to get to confirm button
    await page.keyboard.press('Enter')
    const roundDescription = page.locator('#roundsTableCaption');
    await expect(roundDescription).toHaveText('Table displaying 0 speedgolf rounds');
    // Resets and adds the round back
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Marriotta');
    await page.click('#logRoundForm >> .mode-page-btn-container >> button >> nth=0');
});