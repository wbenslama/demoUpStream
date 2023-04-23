import loginPage from '../Pages/loginPage.js'

const BasePage = require('../../../e2e/src/Utils/BasePage');


const basePage = new BasePage();
const login = new loginPage();

describe('Login test', () => {

  beforeEach(() => {
    basePage.beforeEachHook();
  });

  it('should log in successfully and navigate to dashboard', () => { 
      login.usernameInput()
      login.passwordInput()
      login.loginBtn()
  })
})
