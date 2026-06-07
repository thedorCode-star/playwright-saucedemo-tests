const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('./page-objects/loginPage');
const { ProductPage } = require('./page-objects/productPage');
const { InventoryPage } = require('./page-objects/inventoryPage');
const { CartPage } = require('./page-objects/cartPage');
const { CheckoutPage } = require('./page-objects/checkoutPage');

const LOGIN_USER = 'standard_user';
const LOGIN_PASSWORD = 'secret_sauce';

async function login(page, username = LOGIN_USER) {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, LOGIN_PASSWORD);
  await expect(page).toHaveURL('/inventory.html');
}

const test = base.extend({
  login: async ({ page }, use) => {
    await login(page);
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

module.exports = { test, expect, login, loginAs: login };
