/* import {test, expect} from "@playwright/test";

test('Edit course with keyboard input', async ({page}) => {
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
    await page.click('#coursesMode'); // There is no keyboard interface for navigating course-mode buttons
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 7 Tab presses to get to the edit course button for the Eagle Wood Golf Course
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test edit', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 5 Tab presses to get to the update course button
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 7 Tab presses to get to the edit course button for the eagle course again
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const courseDescription = await page.$eval('#address', el => el.value);
    await expect(courseDescription).toEqual('Test edit');
}); */