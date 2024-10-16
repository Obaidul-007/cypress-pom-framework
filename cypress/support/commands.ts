// Login command without visit (separation of concerns)
Cypress.Commands.add('login', (username: string, password: string) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  });
  
  Cypress.Commands.add('addToCart', (productName: string) => {
    cy.contains('.inventory_item', productName)
      .find('[data-test*="add-to-cart"]')
      .click();
  });
  
  Cypress.Commands.add('getProductInfo', (productName: string) => {
    return cy.contains('.inventory_item', productName).then(($item) => {
      const title = $item.find('.inventory_item_name').text();
      const description = $item.find('.inventory_item_desc').text();
      const price = $item.find('.inventory_item_price').text();
      return { title, description, price };
    });
  });
  
  Cypress.Commands.add('checkoutProcess', (firstName: string, lastName: string, postalCode: string) => {
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
  });