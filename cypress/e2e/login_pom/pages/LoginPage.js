// Nama   : Hilman Aditya
// Tanggal: 06/06/2026
//

class LoginPage {

  getUsernameInput() {
    return cy.get('input[name="username"]')
  }

  getPasswordInput() {
    return cy.get('input[name="password"]')
  }

  getLoginButton() {
    return cy.get('button[type="submit"]')
  }

  getErrorMessage() {
    return cy.get(".oxd-alert-content-text")
  }

  getRequiredMessage() {
    return cy.get(".oxd-input-field-error-message")
  }

  bukaHalamanLogin() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  }

  isiUsername(username) {
    this.getUsernameInput().type(username)
  }

  isiPassword(password) {
    this.getPasswordInput().type(password)
  }

  klikTombolLogin() {
    this.getLoginButton().click()
  }

  lakukanLogin(username, password) {
    this.isiUsername(username)
    this.isiPassword(password)
    this.klikTombolLogin()
  }

  cekBerhasilMasukDashboard() {
    cy.url().should("include", "/dashboard")
  }

  cekMunculPesanError(pesanError) {
    this.getErrorMessage().should("be.visible").and("contain.text", pesanError)
  }

  cekMunculPesanRequired() {
    this.getRequiredMessage().should("contain.text", "Required")
  }

}

export default LoginPage
