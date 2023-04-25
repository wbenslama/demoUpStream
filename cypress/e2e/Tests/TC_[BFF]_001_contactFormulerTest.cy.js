import contactPage from '../Pages/contactPage.js'

const BasePage = require('../Utils/basePage.js');
const basePage = new BasePage();
const contact = new contactPage();
const ele = basePage.getLocatorsJsonFile();
const data = basePage.getUserData();
const jsdata= basePage.getDataJsonFile();


describe('contact jui check test', () => {

  beforeEach(() => {
    basePage.beforeEachHook()  
  })
  
  it('title tag should be the correct',() => {
    cy.title().should('eq','Formulaire de Contact')
  })

  it('hostname should be the correct',() =>{
    cy.location('hostname').should('eq','usptestqa.pages.dev')
  })

  it('protocol should be the correct',() =>{
    cy.location('protocol').should('contains','https')
  })
  it('Contact form button should respect format', () => {
    cy.xpath(ele.contactPage.contactForm).should('have.css', 'max-width', '500px')
    .should('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
    })
  
  it('Page contact should contain all the invoked text and input textarea', () =>{
   cy.get('body')
   .invoke('text')
   .then((text) => {
     expect(text).to.contain('Contactez-nous');
     expect(text).to.contain('Genre *');
     expect(text).to.contain('Nom *');
     expect(text).to.contain('Société');
     expect(text).to.contain('Téléphone');
     expect(text).to.contain('Titre du message');
     expect(text).to.contain('Votre message *');
   });

  })
  it('submit button should respect format', () => {
    cy.xpath(ele.contactPage.submitButton).should('have.css', 'background', 'rgba(0, 0, 0, 0) linear-gradient(to right bottom, rgb(198, 99, 255), rgb(90, 185, 234)) repeat scroll 0% 0% / auto padding-box border-box');
    })

  it('Comment texterea should respect format', () => {
    cy.xpath(ele.contactPage.submitButton).should('have.css', 'font-family', 'Arial')
    .should('have.css', 'font-size', '16px');
    })
  })

describe('create contact check test', () => {
    let statusCode ;
    let body ;
  beforeEach(() => {
      basePage.beforeEachHook()  
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

  
   it('it must create user and valid it', () => { 
    if(statusCode == 200 ){
          if(body.data[0].title == "mr"){
            cy.xpath(ele.contactPage.genreSelect).select('male');
          }else if(body.data[0].title == "ms") {
            cy.xpath(ele.contactPage.genreSelect).select('female');
          }else{
            cy.xpath(ele.contactPage.genreSelect).select('other');
          }
          contact.usernameInput(body.data[0].firstName)
          contact.lastnameInput(body.data[0].lastName)
          contact.companyInput("upStream")
          contact.mobileInput("0681263621")
          contact.titleInput(body.data[0].title)
          contact.MessageInput("employee")
          contact.sendBtn();

          cy.xpath(ele.result.successMsg).should('have.text','Le message a été envoyé.')
     }else{
          cy.log('user data not found');
     }
      })

    it('the user gender must be required ', () => {   
      if(statusCode == 200 ){   
        contact.usernameInput(body.data[0].firstName)
        contact.lastnameInput(body.data[0].lastName)
        contact.MessageInput("employee")
        contact.sendBtn();
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.contain('Veuillez sélectionner un élément dans la liste.');
        });
      }else{
        cy.log('user data not found');
      } 
    })

    it('the user firstname must be required ', () => { 
      if(statusCode == 200 ){  
      if(body.data[0].title == "mr"){
        cy.xpath(ele.contactPage.genreSelect).select('male');
      }else if(body.data[0].title == "ms") {
        cy.xpath(ele.contactPage.genreSelect).select('female');
      }else{
        cy.xpath(ele.contactPage.genreSelect).select('other');
      }
      contact.lastnameInput(body.data[0].lastName)
      contact.MessageInput("employee")
      contact.sendBtn();
      cy.xpath(ele.result.successMsg).should('have.text','Veuillez remplir tous les champs obligatoires.')
    }else{
      cy.log('user data not found');
    }
    })

    it('the user lastname must be required ', () => { 
      if(statusCode == 200 ){  
      if(body.data[0].title == "mr"){
        cy.xpath(ele.contactPage.genreSelect).select('male');
      }else if
      (body.data[0].title == "ms") {
        cy.xpath(ele.contactPage.genreSelect).select('female');
      }else{
        cy.xpath(ele.contactPage.genreSelect).select('other');
      }
      contact.lastnameInput(body.data[0].firstName)
      contact.MessageInput("employee")
      contact.sendBtn();
      cy.xpath(ele.result.successMsg).should('have.text','Veuillez remplir tous les champs obligatoires.')
    }else{
      cy.log('user data not found');
    }
    })

    it('the user comment message must be required ', () => { 
      if(statusCode == 200 ){  
      if(body.data[0].title == "mr"){
        cy.xpath(ele.contactPage.genreSelect).select('male');
      }else if(body.data[0].title == "ms") {
        cy.xpath(ele.contactPage.genreSelect).select('female');
      }else{
        cy.xpath(ele.contactPage.genreSelect).select('other');
      }
      contact.usernameInput(body.data[0].firstName)
      contact.lastnameInput(body.data[0].lastName)
      contact.sendBtn();
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.contain('Veuillez remlir ce champ.');    
     });
    }else{
      cy.log('user data not found');
    }
    })
    
    it('the user company , mobile and title is not required ', () => { 
      if(statusCode == 200 ){  
      if(body.data[0].title == "mr"){
        cy.xpath(ele.contactPage.genreSelect).select('male');
      }else if(body.data[0].title == "ms") {
        cy.xpath(ele.contactPage.genreSelect).select('female');
      }else{
        cy.xpath(ele.contactPage.genreSelect).select('other');
      }
      contact.lastnameInput(body.data[0].firstName)
      contact.usernameInput(body.data[0].lastName)
      contact.MessageInput("employee")
      contact.sendBtn();
      cy.xpath(ele.result.successMsg).should('have.text','Le message a été envoyé.')
    }else{
      cy.log('user data not found');
    }
    })
})
 