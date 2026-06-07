const { test, expect } = require('../fixtures');

test.describe('Visual regression tests', () => {
  test('login page matches screenshot', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveScreenshot('login-page.png', { maxDiffPixels: 100 });
  });

  test('inventory page matches screenshot', async ({ login }) => {
    await expect(login).toHaveScreenshot('inventory-page.png', { maxDiffPixels: 100 });
  });

  test('cart page matches screenshot', async ({ login, inventoryPage, cartPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await expect(cartPage.page).toHaveScreenshot('cart-page.png', { maxDiffPixels: 100 });
  });

  test('checkout page matches screenshot', async ({ login, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await cartPage.checkout();
    await expect(checkoutPage.page).toHaveScreenshot('checkout-page.png', { maxDiffPixels: 100 });
  });

  test('checkout overview page matches screenshot', async ({ login, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await cartPage.checkout();
    await checkoutPage.submitContactInfo('Jane', 'Doe', '12345');
    await expect(checkoutPage.page).toHaveScreenshot('checkout-overview-page.png', { maxDiffPixels: 100 });
  });

  test('order confirmation page matches screenshot', async ({ login, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await cartPage.checkout();
    await checkoutPage.submitContactInfo('Jane', 'Doe', '12345');
    await checkoutPage.finish();
    await expect(checkoutPage.page).toHaveScreenshot('order-confirmation-page.png', { maxDiffPixels: 100 });
  });

  test('empty cart page matches screenshot', async ({ login, cartPage }) => {
    await cartPage.gotoCart();
    await expect(cartPage.page).toHaveScreenshot('empty-cart-page.png', { maxDiffPixels: 100 });
  });

  test('cart item removal page matches screenshot', async ({ login, inventoryPage, cartPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await inventoryPage.addItem('sauce-labs-bike-light');
    await cartPage.gotoCart();
    await cartPage.removeItem('sauce-labs-backpack');
    await expect(cartPage.page).toHaveScreenshot('cart-item-removed-page.png', { maxDiffPixels: 100 });
  });

  test('checkout cancel page matches screenshot', async ({ login, inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await cartPage.checkout();
    await checkoutPage.fillContactInfo('Jane', 'Doe', '12345');
    await cartPage.cancelCheckout();
    await expect(cartPage.page).toHaveScreenshot('checkout-cancel-page.png', { maxDiffPixels: 100 });
  });

  test('login error state matches screenshot', async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    await expect(page).toHaveScreenshot('login-error-state.png', { maxDiffPixels: 100 });
  });
});
