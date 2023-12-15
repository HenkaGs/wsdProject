const { test, expect } = require('@playwright/test');

// Here are function tests using playwright.
// You can test application by first running docker-compose up in e2e-playwright/tests folder 
// and opening up other terminal in same folder and running:
// docker compose run --entrypoint=npx e2e-playwright playwright test; if ($?) { docker compose rm -sf }
// Note: When running tests, first deactivate all "Test List" lists from http://localhost:7777/lists


// 1. Test load main page.
test('Load main page "Shopping lists"', async ({ page }) => {
  await page.goto('http://localhost:7777');
  const title = await page.textContent('h1');
  expect(title).toBe('Shared Shopping Lists');
});

// 2. Test adding new list "Test List".
test('Add new shopping list "Test List"', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  await page.fill('input[name="name"]', 'Test List');
  await page.click('input[type="submit"]');
  expect(await page.getByText('Test List')).toBeTruthy();
});

// 3. Test viewing "Test List".
test('Can view "Test List"', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  const listLink = await page.$('a[href^="/lists/"]');
  if (listLink) {
    await listLink.click();
    const title = await page.textContent('h1');
    expect(title).not.toBe('');
  } else {
    throw new Error('List does not exist');
  }
});

// 4. Test adding item to "Test List".
test('Can add item to "Test List"', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  await page.locator('a:text("Test List")').click();
  await page.fill('input[name="name"]', 'Test Item');
  await page.click('input[type="submit"]');
  const itemText = await page.textContent('li');
  expect(itemText).toContain('Test Item');
});

// 5. Test marking "Test Item" collected from "Test List".
test('Can mark item as collected from "Test List"', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  await page.locator('a:text("Test List")').click();
  await page.click('input[value="Mark collected!"]');
  const itemElement = await page.$('del');
  expect(itemElement).not.toBeNull();
});

// 6. Test deactivating list and check that "Test List" doesn't exist.
test('Can deactivate list"', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  expect(await page.getByText('Test List')).toBeTruthy();
  await page.click('input[value="Deactivate list!"]');
  expect(await page.isVisible("text='Test List'")).not.toBeTruthy()
 
});
