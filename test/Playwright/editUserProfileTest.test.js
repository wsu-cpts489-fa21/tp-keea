import {test, expect} from "@playwright/test";

test('Edit profile mouse input test', async ({page}) => {
    await page.goto('http://localhost:8081/');
    await page.fill('#email', 'malachipotts@gmail.com');
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