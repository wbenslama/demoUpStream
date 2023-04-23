const BasePage = require('../../../e2e/src/Utils/BasePage');
const basePage = new BasePage();
const ele = basePage.getLocatorsJsonFile();
const data= basePage.getDataJsonFile();


class loginPage {
    

    usernameInput() {
        return cy.xpath(ele.logPage.usernameInput).type(data.envRec.username)
    }

    passwordInput() {
        return cy.xpath(ele.logPage.passwordInput).type(data.envRec.password)
    }

    loginBtn() {
        return cy.xpath(ele.logPage.submitButton).click()
    }
}
export default loginPage;