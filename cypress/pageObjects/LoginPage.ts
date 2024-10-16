class LoginPage {
    private usernameInput: string = '[data-test="username"]';
    private passwordInput: string = '[data-test="password"]';
    private loginButton: string = '[data-test="login-button"]';
  
    visit() {
      cy.visit('https://www.saucedemo.com/');
    }
  
    login(username: string, password: string) {
      cy.get(this.usernameInput).type(username);
      cy.get(this.passwordInput).type(password);
      cy.get(this.loginButton).click();
    }
  }
  
  export default new LoginPage();