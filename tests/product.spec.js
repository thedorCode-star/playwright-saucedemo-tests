const { test, expect } = require('./fixtures');

test.describe('Product sort tests for saucedemo', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginStandardUser();
    await expect(loginPage.getInventoryItems()).toHaveCount(6);
  });

  test('sort products by price low to high', async ({ productPage }) => {
    await productPage.sortBy('lohi');
    await expect(productPage.getFirstPrice()).toBeVisible();

    const prices = await productPage.getPriceValues();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('sort products by price high to low', async ({ productPage }) => {
    await productPage.sortBy('hilo');
    await expect(productPage.getFirstPrice()).toBeVisible();

    const prices = await productPage.getPriceValues();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  test('sort by name A to Z', async ({ productPage }) => {
    await productPage.sortBy('az');
    await expect(productPage.getFirstName()).toBeVisible();

    const names = await productPage.getNames();

    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });
});