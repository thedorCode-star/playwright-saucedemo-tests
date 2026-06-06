const { test, expect } = require('@playwright/test');

test.describe('Cart tests for saucedemo', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login and log in with valid credentials for each test
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Add items to cart and verify cart contents', async ({ page }) => {
    // Add first two items to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Verify cart counter shows correct count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Click on the cart icon
    await page.click('.shopping_cart_link');

    // Verify that the correct items are in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.nth(0)).toContainText('Sauce Labs Backpack');
    await expect(cartItems.nth(1)).toContainText('Sauce Labs Bike Light');
  });

  test('Remove item from cart and verify cart contents', async ({ page }) => {
    // Add an item to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Click on the cart icon
    await page.click('.shopping_cart_link');

    // Remove the item from the cart
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Verify that the cart is empty
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0);

    // Verify cart badge is not visible when empty
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('Add all items to cart', async ({ page }) => {
    // Add all available items to the cart
    const addToCartButtons = await page.locator('[data-test^="add-to-cart-"]').elementHandles();
    await expect(addToCartButtons.length).toBeGreaterThan(0);

    for (const button of addToCartButtons) {
      await button.click();
    }

    // Verify cart counter shows correct count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Verify 6 items are in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(6);
  });

  test('Sort products by price low to high on inventory page', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map((price) => parseFloat(price.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    await expect(numericPrices).toEqual(sortedPrices);
  });

  test('Continue shopping button navigates back to inventory', async ({ page }) => {
    // Add an item to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Click continue shopping button
    await page.click('[data-test="continue-shopping"]');

    // Verify we're back on the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Proceed to checkout from cart', async ({ page }) => {
    // Add items to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Click checkout button
    await page.click('[data-test="checkout"]');

    // Verify we're on the checkout page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('Complete checkout and verify thank-you page', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'John');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await expect(page.locator('.summary_total_label')).toContainText('Total');

    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thanks you for your order!');
    await expect(page.locator('.pony_express')).toBeVisible();
  });

  test('Cancel checkout returns to cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'Jane');
    await page.fill('[data-test="lastName"]', 'Doe');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="cancel"]');

    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.title')).toHaveText('Your Cart');
  });

  test('Verify cart persists after adding more items', async ({ page }) => {
    // Add first item
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Navigate to cart
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);

    // Go back to inventory
    await page.click('[data-test="continue-shopping"]');

    // Add another item
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Navigate to cart again
    await page.click('.shopping_cart_link');

    // Verify both items are in the cart
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
  });

  test('Cart displays item prices correctly', async ({ page }) => {
    // Add an item to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Verify the price is displayed for the item
    const itemPrice = page.locator('.inventory_item_price').first();
    await expect(itemPrice).toContainText('$');
  });

  test('Remove specific item and verify cart count updates', async ({ page }) => {
    // Add three items to the cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Navigate to cart
    await page.click('.shopping_cart_link');

    // Remove middle item
    await page.click('[data-test="remove-sauce-labs-bike-light"]');

    // Verify cart count updated
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    // Verify only 2 items remain
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);
  });
});