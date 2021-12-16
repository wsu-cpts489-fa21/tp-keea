/* import {test, expect} from "@playwright/test";

test('Edit profile mouse input test', async ({page}) => {
    await page.goto('http://localhost:8081/');
    await page.fill('#email', 'keeatesting@gmail.com');
    await page.fill('#password', 'a1AAAAAA');
    await page.click('#loginBtn');
    await page.click('#profileBtn');
    await page.fill('#profileSecurityQuestion', 'New security question TEST');
    await page.fill('#profileSecurityAnswer', 'New security answer TEST');
    await page.click('#sgSettingsBtn');
    await page.fill('#sgBio', 'I am a Speedgolf tester!');
    await page.fill('#sgHomeCourser', 'That one mini golf place');
    await page.fill('#sgClubComments', 'I got all the clubs');
    const clubs = page.locator('#sgClubComments');
    await expect(clubs).toHaveText('I got all the clubs');
    await page.click('#submitUpdateProfileBtn');
});

test('Edit profile keyboard input test', async ({page}) => {
    await page.goto('http://localhost:8081/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('keeatesting@gmail.com', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.type('a1AAAAAA', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
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
    await page.keyboard.type('New security question TEST', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.type('New security answer TEST', {delay: 100});
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.type('I am a Speedgolf tester!', {delay: 100});
    await page.keyboard.type('That one mini golf place', {delay: 100});
    await page.keyboard.type('I got all the clubs', {delay: 100});
    const clubs = page.locator('#sgClubComments');
    await expect(clubs).toHaveText('I got all the clubs');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
}); */