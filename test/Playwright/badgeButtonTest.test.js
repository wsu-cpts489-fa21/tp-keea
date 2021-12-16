/* import {test, expect} from "@playwright/test";

test('Badge button mouse input', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Open Badge Page
    await page.click('#badgeBtn');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(2)');
            return {
                name:  name.textContent
            };
        });
    });
    await expect(allbadges[0].name).toEqual("Marathon Man");
    await expect(allbadges[1].name).toEqual("I have the need for Speed...... golf");
    await expect(allbadges[2].name).toEqual("That's par for the course. Literally.");
    await expect(allbadges[3].name).toEqual("Golfing Spree");
    // Click back to rounds and check if back on rounds.
    await page.click(':nth-match(button, 8)');
    let backToRounds = (page.locator('#roundsTableCaption') != null || page.locator('#roundsTableCaption') != undefined);
    await expect(backToRounds).toEqual(true);
}); 

test('Badge button with keyboard input', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Open Badge Page
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // 2 Tab presses to get to Badge button
    await page.keyboard.press('Enter');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(2)');
            return {
                name:  name.textContent
            };
        });
    });
    await expect(allbadges[0].name).toEqual("Marathon Man");
    await expect(allbadges[1].name).toEqual("I have the need for Speed...... golf");
    await expect(allbadges[2].name).toEqual("That's par for the course. Literally.");
    await expect(allbadges[3].name).toEqual("Golfing Spree");
    // Click back to rounds and check if back on rounds.
    await page.keyboard.press('Tab'); // 1 Tab presses to get to Badge button
    await page.keyboard.press('Enter');
    let backToRounds = (page.locator('#roundsTableCaption') != null || page.locator('#roundsTableCaption') != undefined);
    await expect(backToRounds).toEqual(true);
}); */