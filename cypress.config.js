const { defineConfig } = require("cypress");
 //cypress model confi  
module.exports = defineConfig({
  reporter:'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
