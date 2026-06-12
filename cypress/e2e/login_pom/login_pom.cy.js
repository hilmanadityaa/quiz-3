// Nama   : Hilman Aditya
// Tanggal: 06/06/2026


import LoginPage from "./pages/LoginPage"
import loginData from "./data/loginData"

const loginPage = new LoginPage()

describe("Login OrangeHRM - Page Object Model (POM)", () => {
  beforeEach(() => {
    loginPage.bukaHalamanLogin()
  })

  it("TC_001 - Login dengan username dan password yang benar", () => {
    loginPage.lakukanLogin(loginData.usernameBenar, loginData.passwordBenar)
    loginPage.cekBerhasilMasukDashboard()
  })

  it("TC_002 - Login dengan password yang salah", () => {
    loginPage.lakukanLogin(loginData.usernameBenar, loginData.passwordSalah)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_003 - Login dengan username yang salah", () => {
    loginPage.lakukanLogin(loginData.usernameSalah, loginData.passwordBenar)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_004 - Login tanpa mengisi username dan password", () => {
    loginPage.klikTombolLogin()
    loginPage.cekMunculPesanRequired()
  })

  it("TC_005 - Login hanya mengisi username saja", () => {
    loginPage.isiUsername(loginData.usernameBenar)
    loginPage.klikTombolLogin()
    loginPage.cekMunculPesanRequired()
  })

  it("TC_006 - Login hanya mengisi password saja", () => {
    loginPage.isiPassword(loginData.passwordBenar)
    loginPage.klikTombolLogin()
    loginPage.cekMunculPesanRequired()
  })

  it("TC_007 - Login dengan username format email dan password special character", () => {
    loginPage.lakukanLogin(loginData.usernameEmail, loginData.passwordSpecialChar)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_008 - Login dengan username hanya 1 huruf", () => {
    loginPage.lakukanLogin(loginData.username1Huruf, loginData.passwordBenar)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_009 - Login dengan password hanya 1 huruf", () => {
    loginPage.lakukanLogin(loginData.usernameBenar, loginData.password1Huruf)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_010 - Login dengan password ada spasi di awal dan akhir", () => {
    loginPage.isiUsername(loginData.usernameBenar)
    loginPage.getPasswordInput().type(loginData.passwordDenganSpasi)
    loginPage.klikTombolLogin()
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_011 - Login dengan username semua huruf kapital (ADMIN)", () => {
    loginPage.lakukanLogin(loginData.usernameKapitalSemua, loginData.passwordBenar)
    loginPage.cekBerhasilMasukDashboard()
  })

  it("TC_012 - Login dengan username terlalu panjang", () => {
    loginPage.lakukanLogin(loginData.usernameTerlalu_panjang, loginData.passwordBenar)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_013 - Login dengan password terlalu panjang", () => {
    loginPage.lakukanLogin(loginData.usernameBenar, loginData.passwordTerlaluPanjang)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })

  it("TC_014 - Login dengan username ada spasi di tengah", () => {
    loginPage.lakukanLogin(loginData.usernameSpasi, loginData.passwordBenar)
    loginPage.cekMunculPesanError(loginData.pesanErrorInvalidCredentials)
  })
})
