class InventoryPage {
    private productList: string = '.inventory_list';
    private cartIcon: string = '.shopping_cart_link';
  
    verifyProductListDisplayed() {
      cy.get(this.productList).should('be.visible');
    }
  
    addProductToCart(productName: string) {
      cy.contains('.inventory_item', productName)
        .find('button')
        .click();
    }
  
    getProductInfo(productName: string) {
      return cy.contains('.inventory_item', productName).then(($item) => {
        const title = $item.find('.inventory_item_name').text();
        const description = $item.find('.inventory_item_desc').text();
        const price = $item.find('.inventory_item_price').text();
        return { title, description, price };
      });
    }
  
    goToCart() {
      cy.get(this.cartIcon).click();
    }
  }
  
  export default new InventoryPage();