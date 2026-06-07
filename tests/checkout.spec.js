const { test, expect } = require('./fixtures');

test.describe('Checkout tests for saucedemo', () => {
  test.beforeEach(async ({ login }) => {
    // Shared login helper already navigates to inventory
  });

  test('complete happy path checkout', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');

    await cartPage.gotoCart();
    await expect(cartPage.getCartItems()).toHaveCount(1);

    await cartPage.checkout();
    await expect(checkoutPage.getTitle()).toHaveText('Checkout: Your Information');

    await checkoutPage.submitContactInfo('Test', 'User', 'H0H0H0');

    // Verify item still there and total calculated
    await expect(cartPage.getCartItems()).toHaveCount(1);
    await expect(checkoutPage.getSummaryTotalLabel()).toContainText('32.39'); // $29.99 + tax

    // Finish
    await checkoutPage.finish();
    await expect(checkoutPage.getCompleteHeader()).toHaveText('Thank you for your order!');

    // Back home
    await checkoutPage.backToProducts();
    await expect(checkoutPage.getInventoryList()).toBeVisible();
  });

  test('checkout with empty first name shows error', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItem('sauce-labs-backpack');
    await cartPage.gotoCart();
    await cartPage.checkout();
    await checkoutPage.submitContactInfo('', 'User', '12345');

    await expect(checkoutPage.getErrorMessage()).toContainText('First Name is required');
  });
});