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
      // **Sauce Demo Service Worker Workaround**
      // Sauce Demo website's service-worker.js prevent the page's 'load' event from triggering in subsequent Cypress tests; 
      // potentially freezing cy.visit() calls. To handle this, the following interceptor is added.
      // Reference: https://filiphric.com/how-to-wait-for-page-to-load-in-cypress
      cy.intercept('/service-worker.js', {
        body: undefined
       })      
      cy.visit('/');
      cy.login(users.standard.username, users.standard.password);
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