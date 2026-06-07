const { BasePage } = require('./basePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async gotoCart() {
    await this.page.click('.shopping_cart_link');
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

  async removeItem(itemId) {
    await this.page.click(`[data-test="remove-${itemId}"]`);
  }

  async cancelCheckout() {
    await this.page.click('[data-test="cancel"]');
  }

  async continueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  getCartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  getCartItems() {
    return this.page.locator('.cart_item');
  }

  async getCartItemCount() {
    return await this.page.locator('.cart_item').count();
  }

  getFirstItemPrice() {
    return this.getFirst('.inventory_item_price');
  }
}

module.exports = { CartPage };
