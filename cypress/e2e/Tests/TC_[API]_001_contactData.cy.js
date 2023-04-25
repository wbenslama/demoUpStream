const BasePage = require('../Utils/basePage.js');
const basePage = new BasePage();  
const jsdata= basePage.getDataJsonFile();


describe("Api data verification", () =>{
        
      let statusCode ;
      let body ;
    beforeEach(() => {
        // call get methode and set app-id on headrs 
        cy.request({
          method: 'GET',
          url: jsdata.envRecInteg.baseUrl,
          headers: {
                'app-id': jsdata.envRecInteg.appId,
                'Content-Type': 'application/json',
                'Accept-Language': 'fr-FR'
              }
        }).then((response) => {
           statusCode = response.status;
           body = response.body;
        })
      })
      
      it("get code status return check", () =>{
            cy.log(body);
            expect(statusCode).to.eq(200)
          });

      it("check user data foramt", () =>{
                  cy.log(body);
                  expect(body.data[0].id).to.be.a('string')
                  expect(body.data[0].title).to.be.a('string')
                  expect(body.data[0].firstName).to.be.a('string')
                  expect(body.data[0].lastName).to.be.a('string')
                  expect(body.data[0].picture).to.be.a('string')
                  expect(body.data[0]).to.have.keys('firstName', 'id', 'lastName', 'picture', 'title')

                  cy.writeFile('cypress/fixtures/userDataOutput.json', body);
                });
      })

