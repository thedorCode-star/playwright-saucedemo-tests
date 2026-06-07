class BasePage {
  constructor(page) {
    this.page = page;
  }

  getTitle() {
    return this.page.locator('.title');
  }

  getLocator(selector) {
    return this.page.locator(selector);
  }

  getFirst(selector) {
    return this.page.locator(selector).first();
  }

  async getAllTextContents(selector) {
    return this.page.locator(selector).allTextContents();
  }
}

module.exports = { BasePage };
