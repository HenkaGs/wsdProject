// const { test, expect } = require("@playwright/test");

// test("Server responds with the text 'Hello world!'", async ({ page }) => {
//   const response = await page.goto("/");
//   expect(await response.text()).toBe("Hello world!");
// });

const { test, expect } = require('@playwright/test');

// 1. Test Main Page Load
test('Main page loads with correct title', async ({ page }) => {
  await page.goto('http://localhost:7777');
  const title = await page.title();
  expect(title).toBe('Shopping lists');
});

// 2. Test Adding a Shopping List
test('Can add a new shopping list', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  await page.fill('input[name="name"]', 'Test List');
  await page.click('input[type="submit"]');
  const response = await page.waitForResponse(response => response.url().endsWith('/lists') && response.status() === 303);
  expect(response.status()).toBe(303);
});

// 3. Test Viewing a Shopping List
test('Can view a specific shopping list', async ({ page }) => {
  await page.goto('http://localhost:7777/lists');
  const listLink = await page.$('a[href^="/lists/"]');
  if (listLink) {
    await listLink.click();
    const title = await page.textContent('h1');
    expect(title).not.toBe('');
  } else {
    throw new Error('No shopping list found to view');
  }
});

// 4. Test Adding an Item to a Shopping List
test('Can add an item to a shopping list', async ({ page }) => {
  // Assuming there is already a list created
  await page.goto('http://localhost:7777/lists/1'); // Replace '1' with an existing list id
  await page.fill('input[name="name"]', 'Test Item');
  await page.click('input[type="submit"]');
  const itemText = await page.textContent('li');
  expect(itemText).toContain('Test Item');
});

// 5. Test Marking an Item as Collected
test('Can mark an item as collected', async ({ page }) => {
  // Assuming there is an item in the list
  await page.goto('http://localhost:7777/lists/1'); // Replace '1' with an existing list id
  await page.click('input[value="Mark collected!"]');
  const itemElement = await page.$('del');
  expect(itemElement).not.toBeNull();
});
