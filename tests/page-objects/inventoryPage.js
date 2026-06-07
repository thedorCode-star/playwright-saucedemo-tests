const { BasePage } = require('./basePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async addItem(itemId) {
    await this.page.click(`[data-test="add-to-cart-${itemId}"]`);
  }

  async addAllItems() {
    let buttons = this.page.locator('[data-test^="add-to-cart-"]');
    while (await buttons.count() > 0) {
      await buttons.first().click();
      buttons = this.page.locator('[data-test^="add-to-cart-"]');
    }
  }

  async gotoCart() {
    await this.page.click('.shopping_cart_link');
  }

  async sortBy(option) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async continueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  async getPrices() {
    return this.getAllTextContents('.inventory_item_price');
  }

  async getPriceValues() {
    const prices = await this.getPrices();
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async getNames() {
    return this.getAllTextContents('.inventory_item_name');
  }
}

module.exports = { InventoryPage };
