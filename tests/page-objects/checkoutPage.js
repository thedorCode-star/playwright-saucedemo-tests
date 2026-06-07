const { BasePage } = require('./basePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.backToProductsButton = page.locator('#back-to-products');
    this.errorMessage = page.locator('[data-test="error"]');
    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.ponyExpress = page.locator('.pony_express');
  }

  async fillContactInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async submitContactInfo(firstName, lastName, postalCode) {
    await this.fillContactInfo(firstName, lastName, postalCode);
    await this.continue();
  }

  async continue() {
    await this.page.click('#continue');
  }

  async finish() {
    await this.page.click('#finish');
  }

  async backToProducts() {
    await this.page.click('#back-to-products');
  }

  getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  getSummaryTotalLabel() {
    return this.summaryTotalLabel;
  }

  getCompleteHeader() {
    return this.completeHeader;
  }

  getPonyExpress() {
    return this.ponyExpress;
  }

  getInventoryList() {
    return this.page.locator('.inventory_list');
  }

  async getSummaryTotalText() {
    return this.page.locator('.summary_total_label').textContent();
  }
}

module.exports = { CheckoutPage };
