const BasePage = require('../Utils/basePage.js');
const basePage = new BasePage();  
const data= basePage.getDataJsonFile();


describe("Log page API testing", () =>{
        
      it("get user data name", () =>{
            cy.request({
                  method: 'GET',
                  url: data.envRecInteg.baseUrl,
                  headers: {
                        'app-id': data.envRecInteg.appId,
                        'Content-Type': 'application/json',
                        'Accept-Language': 'fr-FR'
                      }
                }).then((response) => {
                  const data = response.body;
                  cy.log(data);
                  expect(response.status).to.eq(200);
                  cy.writeFile('cypress/fixtures/userDataOutput.json', data);
                });
      })
})
