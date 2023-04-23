class BasePage {

    constructor() {
        this.ele = null;
        this.data=null;
        this.config=null;
      }
    
    beforeEachHook() {
      const   data = this.getDataJsonFile()
      const   config = this.getBaseConfigFile()
      cy.log('start test hook');  
         if(config.Recette == "true")
         {
           cy.visit(data.envRec.baseUrl)
         }
         else if (config.RecDaynamique == "true") {
           cy.visit(data.envRecDynm.baseUrl)
         } 
        else if (config.intergration == "true"){
          cy.visit(data.envRecInteg.baseUrl)
         }
         else {
          cy.log('no environement is defined');
         }
    }

    getLocatorsJsonFile() {
      this.ele = require('./locators.json')
      return this.ele;
    }

    getDataJsonFile() {
      this.data = require('../../../fixtures/testdata.json')
      return this.data;
    }
    
    getBaseConfigFile() {
      this.config = require('../../config/config.json')
      return this.config;
    }

    afterEachHook() {
      cy.log('end test');
    }
  }
  
  module.exports = BasePage;
  
  