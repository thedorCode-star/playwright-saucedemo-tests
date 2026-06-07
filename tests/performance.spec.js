const { test, expect } = require('./fixtures');

test('login page load time under 3 seconds', async ({ page }) => {
  const start = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(3000);
});

test('inventory page load time under 3 seconds', async ({ login }) => {
  const page = login;
  const start = Date.now();
  await page.goto('/inventory.html');
  const loadTime = Date.now() - start;
  expect(loadTime).toBeLessThan(3000);
});

test('checkout page transition under 3 seconds', async ({ login, inventoryPage, cartPage }) => {
  const page = login;
  await inventoryPage.addItem('sauce-labs-backpack');
  await cartPage.gotoCart();

  const start = Date.now();
  await cartPage.checkout();
  await page.waitForURL('/checkout-step-one.html');

  const transitionTime = Date.now() - start;
  expect(transitionTime).toBeLessThan(3000);
});

test('no 404 or 500 errors on inventory page', async ({ page }) => {
  const errors = [];

  page.on('response', response => {
    if ([404, 500].includes(response.status())) {
      errors.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL('/inventory.html');

  expect(errors).toEqual([]);
});

test('no 404 errors on page', async ({ login }) => {
  const page = login;
  const errors = [];

  page.on('response', response => {
    if (response.status() === 404) errors.push(response.url());
  });

  await page.goto('/');
  expect(errors).toEqual([]);
});