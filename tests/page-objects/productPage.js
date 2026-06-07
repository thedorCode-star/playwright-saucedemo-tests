const { BasePage } = require('./basePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async sortBy(option) {
    await this.page.selectOption('.product_sort_container', option);
  }

  async getPriceValues() {
    const prices = await this.getAllTextContents('.inventory_item_price');
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }

  async getNames() {
    return this.getAllTextContents('.inventory_item_name');
  }

  getFirstPrice() {
    return this.getFirst('.inventory_item_price');
  }

  getFirstName() {
    return this.getFirst('.inventory_item_name');
  }
}

module.exports = { ProductPage };
