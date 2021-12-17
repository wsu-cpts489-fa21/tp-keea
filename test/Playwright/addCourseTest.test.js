import {test, expect} from "@playwright/test";

test('Add Course Mouse Input Test', async ({page}) => {
    // Stub for delete process with mouse inputs
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@mail.co');
    await page.fill('#password', 'Test3r!!!');
    await page.click('#loginBtn');
    await page.click('#coursesMode');
        // Add course
        await page.click('#roundsModeActionBtn');
        await page.fill('#courseName', 'Everett Golf & Country Club');
        await page.fill('#address', '1500 52nd St SE, Everett, WA 98203');
        await page.fill('#coursePhoneNumber', '(425) 259-8141');
        await page.fill('#courseGeolocation', '47.9474923,-122.2111587');
        await page.click('#addCourseBtn');
    const courseDescription = page.locator('#coursesTableCaption');
    await expect(courseDescription).toHaveText('Table displaying 6 speedgolf courses');
}); 

test('Add course with keyboard input', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('test@mail.co'); // Only works for my configuration
    await page.keyboard.press('Tab');
    await page.keyboard.type('Test3r!!!');  // Again, only works for my configuration
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
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 34 Tab presses to get to the Add Course button
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Everett Golf & Country Club');
    await page.keyboard.press('Tab');
    await page.keyboard.type('1500 52nd St SE, Everett, WA 98203');
    await page.keyboard.press('Tab');
    await page.keyboard.type('(425) 259-8141');
    await page.keyboard.press('Tab');
    await page.keyboard.type('47.9474923,-122.2111587');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 3 Tab presses to get to Add Course button
    await page.keyboard.press('Enter');
    const courseDescription = page.locator('#coursesTableCaption');
    await expect(courseDescription).toHaveText('Table displaying 6 speedgolf courses');
});