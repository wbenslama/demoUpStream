const BasePage = require('../Utils/basePage');
const basePage = new BasePage();
const ele = basePage.getLocatorsJsonFile();


class contactPage {
    

    usernameInput(name) {
        return cy.xpath(ele.contactPage.usernameInput).type(name)
    }

    lastnameInput(lastname) {
        return cy.xpath(ele.contactPage.lastnameInput).type(lastname)
    }

    companyInput(company) {
        return cy.xpath(ele.contactPage.companyInput).type(company)
    } 

    mobileInput(mobile) {
        return cy.xpath(ele.contactPage.phoneInput).type(mobile)
    }

    titleInput(title) {
        return cy.xpath(ele.contactPage.titleInput).type(title)
    }

    MessageInput(msg) {
        return cy.xpath(ele.contactPage.messageInput).type(msg)
    }

    sendBtn() {
        return cy.xpath(ele.contactPage.submitButton).click()
    }
}
export default contactPage;