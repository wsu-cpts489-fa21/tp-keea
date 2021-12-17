/* import {test, expect} from "@playwright/test";

// This assumes the account has been reset to have no rounds and badges unlocked.
test('Marathon Man Badge', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Add qualifying Round
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Test');
    await page.click(':nth-match(button, 8)');
    await page.click('#badgeBtn');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(4)');
            return {
                name:  name.innerHTML
            };
        });
    });

    await expect(allbadges[0].name).toContain("id=\"Check\"");
    await expect(allbadges[1].name).toContain("id=\"X\"");
    await expect(allbadges[2].name).toContain("id=\"X\"");
    await expect(allbadges[3].name).toContain("id=\"X\"");
});

test("Golfing Spree Badge", async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Add qualifying Round
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Test');
    await page.click(':nth-match(button, 8)');
    await page.click('#badgeBtn');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(4)');
            return {
                name:  name.innerHTML
            };
        });
    });

    await expect(allbadges[0].name).toContain("id=\"Check\"");
    await expect(allbadges[1].name).toContain("id=\"X\"");
    await expect(allbadges[2].name).toContain("id=\"X\"");
    await expect(allbadges[3].name).toContain("id=\"Check\"");
});


test('I have the need for Speed...... golf Badge', async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Add qualifying Round
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Test');
    await page.fill('#roundMinutes', "");
    await page.fill('#roundMinutes', "29");
    await page.click(':nth-match(button, 8)');
    await page.click('#badgeBtn');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(4)');
            return {
                name:  name.innerHTML
            };
        });
    });

    await expect(allbadges[0].name).toContain("id=\"Check\"");
    await expect(allbadges[1].name).toContain("id=\"Check\"");
    await expect(allbadges[2].name).toContain("id=\"X\"");
    await expect(allbadges[3].name).toContain("id=\"Check\"");
});

test("That's par for the course. Literally. Badge", async ({page}) => {
    await page.goto('http://localhost:8081');
    await page.fill('#email', 'test@account.com');
    await page.fill('#password', 'Test1234');
    await page.click('#loginBtn');
    await page.click('#roundsMode');
    // Add qualifying Round
    await page.click('#roundsModeActionBtn');
    await page.fill('#roundCourse', 'Test');
    await page.fill('#roundStrokes', "");
    await page.fill('#roundStrokes', "72");
    await page.click(':nth-match(button, 8)');
    await page.click('#badgeBtn');
    // Get all badge names and ensure they all exist.
    const allbadges = await page.$$eval('tbody >> tr', (badges) => {
        return badges.map(badge => {
            let name = badge.querySelector('td:nth-child(4)');
            return {
                name:  name.innerHTML
            };
        });
    });

    await expect(allbadges[0].name).toContain("id=\"Check\"");
    await expect(allbadges[1].name).toContain("id=\"Check\"");
    await expect(allbadges[2].name).toContain("id=\"Check\"");
    await expect(allbadges[3].name).toContain("id=\"Check\"");
}); */