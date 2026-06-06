// tests/login.spec.js

const { test, expect } = require('@playwright/test');

test('Login with valid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Log in with valid credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Verify that the user is redirected to the inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login with invalid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Log in with invalid credentials
  await page.fill('#user-name', 'invalid_user');
  await page.fill('#password', 'invalid_password');
  await page.click('#login-button');

  // Verify that an error message is displayed
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Username and password do not match any user in this service');
});

test('Login with empty credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Attempt to log in with empty credentials
  await page.click('#login-button');

  // Verify that an error message is displayed
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Username is required');
});     