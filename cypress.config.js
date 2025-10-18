const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2, // Executar duas vezes
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});