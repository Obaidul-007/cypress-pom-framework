describe('Cart and Purchase Functionality', () => {
    let users: any;
    let products: any;
  
    before(() => {
      cy.fixture('users').then((userData) => {
        users = userData;
      });
      cy.fixture('products').then((productData) => {
        products = productData;
      });
    });
  
    beforeEach(() => {
      // Intercept and stub any unauthorized requests
      cy.intercept('POST', 'https://events.backtrace.io/**', {
        statusCode: 200,
        body: {}
      }).as('backtraceEvents');
      
      // Reset session and set up initial state
      cy.session('reset', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
      });
      
      cy.visit('/');
      cy.get('[data-test="username"]').type(users.standard.username);
      cy.get('[data-test="password"]').type(users.standard.password);
      cy.get('[data-test="login-button"]').click();
    });
  
    it('should add products to cart and complete purchase', () => {
      const { backpack, checkout } = products;
      
      cy.getProductInfo(backpack.name).then((productInfo) => {
        cy.addToCart(backpack.name);
        cy.get('.shopping_cart_link').click();
        
        // Verify product in cart
        cy.get('.cart_item').should('contain', backpack.name);
        
        // Proceed with checkout
        cy.checkoutProcess(
          checkout.firstName,
          checkout.lastName,
          checkout.postalCode
        );
        
        // Verify product info on checkout page
        cy.get('.inventory_item_name').should('have.text', productInfo.title);
        cy.get('.inventory_item_price').should('have.text', backpack.expectedPrice);
        
        // Complete purchase
        cy.get('[data-test="finish"]').click();
        
        // Verify completion message
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
      });
    });
  });