import LoginPage from '../pageObjects/LoginPage';

describe('Login Functionality', () => {
    let users: any;

    before(() => {
        cy.fixture('users').then((userData) => {
            users = userData;
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
    });

    afterEach(() => {
        // Only attempt logout if we're on the inventory page
        cy.url().then((url) => {
            if (url.includes('/inventory.html')) {
                LoginPage.logout();
            }
        });
    });

    it('should login with valid credentials', () => {
        cy.login(users.standard.username, users.standard.password);
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
    });

    it('should not login with invalid credentials', () => {
        cy.login(users.invalid.username, users.invalid.password);
        // Add assertion for failed login
        cy.get('[data-test="error"]').should('be.visible');
    }); 
});