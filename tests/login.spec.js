const { test, expect, loginAs } = require('./fixtures');

test.describe('Login tests for saucedemo', () => {
  test('Valid login with standard_user', async ({ loginPage, page }) => {
    await loginAs(page);
    await expect(page).toHaveURL('/inventory.html');
    await expect(loginPage.getTitle()).toHaveText('Products');
    await expect(loginPage.getInventoryItems()).toHaveCount(6);
  });

  test('Invalid login with wrong password', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Invalid login with empty fields', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username is required');
  });

  test('Invalid login with locked_out_user', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Invalid login with empty username only', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username is required');
  });

  test('Invalid login with empty password only', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.fillUsername('standard_user');
    await loginPage.clickLogin();
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Password is required');
  });

  test('Invalid login with wrong username', async ({ loginPage }) => {
    await loginPage.login('not_a_user', 'secret_sauce');
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Invalid login with whitespace username', async ({ loginPage }) => {
    await loginPage.login('   ', 'secret_sauce');
    await expect(loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Valid login with problem_user', async ({ loginPage, page }) => {
    await loginAs(page, 'problem_user');
    await expect(page).toHaveURL('/inventory.html');
    await expect(loginPage.getTitle()).toHaveText('Products');
  });

  test('Valid login with performance_glitch_user', async ({ loginPage, page }) => {
    await loginAs(page, 'performance_glitch_user');
    await expect(page).toHaveURL('/inventory.html');
    await expect(loginPage.getTitle()).toHaveText('Products');
  });

  test('Logout via the side menu returns to login page', async ({ page, loginPage }) => {
    await loginAs(page);
    await loginPage.logout();
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('Password field should be masked', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('Login button should be enabled by default', async ({ loginPage }) => {
    await loginPage.goto();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('Error message should be visible and dismissible', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.getErrorMessage()).toBeVisible();
    await loginPage.dismissError();
    await expect(loginPage.getErrorMessage()).not.toBeVisible();
  });
});
