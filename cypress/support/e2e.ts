import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>
      addToCart(productName: string): Chainable<void>
      getProductInfo(productName: string): Chainable<{ title: string; description: string; price: string }>
      checkoutProcess(firstName: string, lastName: string, postalCode: string): Chainable<void>
    }
  }
}