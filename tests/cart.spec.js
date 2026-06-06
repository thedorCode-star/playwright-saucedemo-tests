
const { test, expect } = require('@playwright/test');

test('Add items to cart and verify cart contents', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Log in with valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Add first two items to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  // Click on the cart icon
  await page.click('.shopping_cart_link');

  // Verify that the correct items are in the cart
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(2);
  await expect(cartItems.nth(0)).toContainText('Sauce Labs Backpack');
  await expect(cartItems.nth(1)).toContainText('Sauce Labs Bike Light');
});

test('Remove item from cart and verify cart contents', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Log in with valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Add an item to the cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Click on the cart icon
  await page.click('.shopping_cart_link');

  // Remove the item from the cart
  await page.click('[data-test="remove-sauce-labs-backpack"]');

  // Verify that the cart is empty
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(0);
}); 