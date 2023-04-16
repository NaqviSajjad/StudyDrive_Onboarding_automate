const { defineConfig } = require("cypress");

module.exports = defineConfig({

   ccm_cookie:
   'v2|H4sIAAAAAAAAAAXBgQ0AMAQEwIkkKJ8ap7SmMHzvPC2VsUlRRnaqKdJBgfvW7WAtzAi2qDuWDH/QtU7/MgAAAA=',
 
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
