class LoginPage {
  private usernameInput: string = '[data-test="username"]';
  private passwordInput: string = '[data-test="password"]';
  private loginButton: string = '[data-test="login-button"]';
  private burgerMenu: string = '[id="react-burger-menu-btn"]';
  private logoutLink: string = '[id="logout_sidebar_link"]';

  login(username: string, password: string) {
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      cy.get(this.loginButton).click();
  }

  logout() {
      // Wait for the burger menu to be clickable
      cy.get(this.burgerMenu).should('be.visible').click();
      // Wait for the menu to slide out and logout link to be clickable
      cy.get(this.logoutLink).should('be.visible').click();
      // Verify return to login page
      cy.get(this.loginButton).should('be.visible');
      cy.url().should('include', '/');
  }
}

export default new LoginPage();