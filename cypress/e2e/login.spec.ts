describe('Login Functionality', () => {
    let users: any;
  
    before(() => {
      cy.fixture('users').then((userData) => {
        users = userData;
      });
    });
  
    beforeEach(() => {
      // Intercept and stub any unauthorized requests
      cy.intercept('POST', 'https://events.backtrace.io/**', {
        statusCode: 200,
        body: {}
      }).as('backtraceEvents');
      
      // Reset session and visit the page
      cy.session('reset', () => {
        cy.clearCookies();
        cy.clearLocalStorage();
      });
      
      cy.visit('/');
    });
  
    it('should login with valid credentials', () => {
      cy.get('[data-test="username"]').type(users.standard.username);
      cy.get('[data-test="password"]').type(users.standard.password);
      cy.get('[data-test="login-button"]').click();
      
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_list').should('be.visible');
    });
  });