const { test, expect } = require('./fixtures');

test.describe('Cart tests for saucedemo', () => {
  test.beforeEach(async ({ login }) => {
    // Use shared login helper for each cart test
  });

  test('Add items to cart and verify cart contents', async ({ page, inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addItem('sauce-labs-backpack');
    await inventory.addItem('sauce-labs-bike-light');

    await expect(cart.getCartBadge()).toHaveText('2');

    await cart.gotoCart();

    const cartItems = cart.getCartItems();
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toContainText('Sauce Labs Backpack');
    await expect(cartItems.nth(1)).toContainText('Sauce Labs Bike Light');
  });

  test('Remove item from cart and verify cart contents', async ({ page, inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.removeItem('sauce-labs-backpack');

    const cartItems = cart.getCartItems();
    await expect(cartItems).toHaveCount(0);
    await expect(cart.getCartBadge()).not.toBeVisible();
  });

  test('Empty cart cannot proceed to checkout', async ({ page, cartPage }) => {
    const cart = cartPage;

    await cart.gotoCart();
    await expect(page).toHaveURL('/cart.html');
    await expect(cart.getCartItems()).toHaveCount(0);
  });

  test('Add all items to cart', async ({ page, inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addAllItems();
    await expect(cart.getCartBadge()).toHaveText('6');

    await cart.gotoCart();

    const cartItems = cart.getCartItems();
    await expect(cartItems).toHaveCount(6);
  });

  test('Sort products by price low to high on inventory page', async ({ inventoryPage, page }) => {
    const inventory = inventoryPage;

    await inventory.sortBy('lohi');
    const prices = await inventory.getPrices();
    const numericPrices = prices.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    await expect(numericPrices).toEqual(sortedPrices);
  });

  test('Continue shopping button navigates back to inventory', async ({ page, inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.continueShopping();

    await expect(page).toHaveURL('/inventory.html');
    await expect(cart.getTitle()).toHaveText('Products');
  });

  test('Proceed to checkout from cart', async ({ page, inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addItem('sauce-labs-backpack');
    await inventory.addItem('sauce-labs-bike-light');
    await cart.gotoCart();
    await cart.checkout();

    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('Complete checkout and verify thank-you page', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;
    const checkout = checkoutPage;

    await inventory.addItem('sauce-labs-backpack');
    await inventory.addItem('sauce-labs-bike-light');
    await cart.gotoCart();
    await cart.checkout();

    await checkout.submitContactInfo('John', 'Doe', '12345');

    await expect(checkout.getTitle()).toHaveText('Checkout: Overview');
    await expect(checkout.getSummaryTotalLabel()).toContainText('Total');

    await checkout.finish();
    await expect(checkout.getCompleteHeader()).toHaveText('Thank you for your order!');
    await expect(checkout.getPonyExpress()).toBeVisible();
  });

  test('Checkout validation shows error when first name is missing', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;
    const checkout = checkoutPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.checkout();

    await checkout.submitContactInfo('', 'Doe', '12345');
    await expect(checkout.getErrorMessage()).toHaveText('Error: First Name is required');
  });

  test('Checkout validation shows error when last name is missing', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;
    const checkout = checkoutPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.checkout();

    await checkout.submitContactInfo('John', '', '12345');
    await expect(checkout.getErrorMessage()).toHaveText('Error: Last Name is required');
  });

  test('Checkout validation shows error when postal code is missing', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;
    const checkout = checkoutPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.checkout();

    await checkout.submitContactInfo('John', 'Doe', '');
    await expect(checkout.getErrorMessage()).toHaveText('Error: Postal Code is required');
  });

  test('Cancel checkout returns to cart', async ({ page, inventoryPage, cartPage, checkoutPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;
    const checkout = checkoutPage;

    await inventory.addItem('sauce-labs-backpack');
    await cart.gotoCart();
    await cart.checkout();

    await checkout.fillContactInfo('Jane', 'Doe', '12345');
    await cart.cancelCheckout();

    await expect(page).toHaveURL('/cart.html');
    await expect(cart.getTitle()).toHaveText('Your Cart');
  });

  test('Verify cart persists after adding more items', async ({ inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    // Add first item
    await inventory.addItem('sauce-labs-backpack');
    await expect(cart.getCartBadge()).toHaveText('1');

    // Navigate to cart
    await cart.gotoCart();
    await expect(cart.getCartItems()).toHaveCount(1);

    // Go back to inventory
    await cart.continueShopping();

    // Add another item
    await inventory.addItem('sauce-labs-bike-light');
    await expect(cart.getCartBadge()).toHaveText('2');

    // Navigate to cart again
    await cart.gotoCart();

    // Verify both items are in the cart
    const cartItems = cart.getCartItems();
    await expect(cartItems).toHaveCount(2);
  });

  test('Cart displays item prices correctly', async ({ inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    // Add an item to the cart
    await inventory.addItem('sauce-labs-backpack');

    // Navigate to cart
    await cart.gotoCart();

    // Verify the price is displayed for the first item
    await expect(cart.getFirstItemPrice()).toContainText('$');
  });

  test('Remove specific item and verify cart count updates', async ({ inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    // Add three items to the cart
    await inventory.addItem('sauce-labs-backpack');
    await inventory.addItem('sauce-labs-bike-light');
    await inventory.addItem('sauce-labs-bolt-t-shirt');

    await expect(cart.getCartBadge()).toHaveText('3');

    // Navigate to cart
    await cart.gotoCart();

    // Remove middle item
    await cart.removeItem('sauce-labs-bike-light');

    // Verify cart count updated
    await expect(cart.getCartBadge()).toHaveText('2');

    // Verify only 2 items remain
    const cartItems = cart.getCartItems();
    await expect(cartItems).toHaveCount(2);
  });

  test('Remove all items and verify cart is empty', async ({ inventoryPage, cartPage }) => {
    const inventory = inventoryPage;
    const cart = cartPage;

    await inventory.addItem('sauce-labs-backpack');
    await inventory.addItem('sauce-labs-bike-light');

    await cart.gotoCart();
    await cart.removeItem('sauce-labs-backpack');
    await cart.removeItem('sauce-labs-bike-light');

    await expect(cart.getCartItems()).toHaveCount(0);
    await expect(cart.getCartBadge()).not.toBeVisible();
  });
});