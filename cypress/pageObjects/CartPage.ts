class CartPage {
    private checkoutButton: string = '[data-test="checkout"]';
    private firstNameInput: string = '[data-test="firstName"]';
    private lastNameInput: string = '[data-test="lastName"]';
    private postalCodeInput: string = '[data-test="postalCode"]';
    private continueButton: string = '[data-test="continue"]';
    private finishButton: string = '[data-test="finish"]';
    private completionMessage: string = '.complete-header';
  
    checkout() {
      cy.get(this.checkoutButton).click();
    }
  
    fillShippingInfo(firstName: string, lastName: string, postalCode: string) {
      cy.get(this.firstNameInput).type(firstName);
      cy.get(this.lastNameInput).type(lastName);
      cy.get(this.postalCodeInput).type(postalCode);
      cy.get(this.continueButton).click();
    }
  
    finishPurchase() {
      cy.get(this.finishButton).click();
    }
  
    verifyCompletionMessage() {
      cy.get(this.completionMessage).should('contain', 'Thank you for your order!');
    }
  
    verifyProductInfo(productName: string, expectedInfo: { title: string, description: string, price: string }) {
      cy.contains('.cart_item', productName).within(() => {
        cy.get('.inventory_item_name').should('have.text', expectedInfo.title);
        cy.get('.inventory_item_desc').should('have.text', expectedInfo.description);
        cy.get('.inventory_item_price').should('have.text', expectedInfo.price);
      });
    }
  }
  
  export default new CartPage();