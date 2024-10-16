# Cypress Tests

This project contains automated tests for the Sauce Demo website using Cypress with TypeScript and Page Object Model (POM) pattern.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/Obaidul-007/cypress-pom-framework.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running Tests

To run the tests in headless mode:

```
npx cypress run
```

## Test Structure

- `cypress/e2e/`: Contains test files
- `cypress/pageObjects/`: Contains Page Object Model classes
- `cypress/support/`: Contains custom commands and other support files

## Assumptions and Limitations

- Tests are designed for the Sauce Demo website (https://www.saucedemo.com/) at the time of writing. Changes to the website may require updates to the tests.
- Tests assume a stable internet connection
- Tests use the 'standard_user' account for login
- Product availability and prices may change, which could affect test results

## Troubleshooting

If you encounter timeout issues:

1. Check your internet connection
2. Ensure the Sauce Demo website is accessible
3. Try increasing the `pageLoadTimeout` in `cypress.config.js`
4. Review the Cypress logs for more detailed error information

## Best Practices Used

- Page Object Model
- Data-driven testing using fixtures
- Custom commands for reusable actions
- Error handling for uncaught exceptions
- Use of Cypress 10+ folder structure and configuration
- Robust page loading with retry mechanism
- Detailed logging for easier debugging

