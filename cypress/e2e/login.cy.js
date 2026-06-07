// Test Automation - Login OrangeHRM
// Nama   : Hilman Aditya
// Tanggal: 06/06/2026

describe("Login OrangeHRM", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  })

  it("TC_001 - Login dengan username dan password yang benar", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.url().should("include", "/dashboard")
  })

  it("TC_002 - Login dengan password yang salah", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin12345")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_003 - Login dengan username yang salah", () => {
    cy.get('input[name="username"]').type("Abdul")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_004 - Login tanpa mengisi username dan password", () => {
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-input-field-error-message").should("have.length.at.least", 2)
    cy.get(".oxd-input-field-error-message").first().should("contain.text", "Required")
  })

  it("TC_005 - Login hanya mengisi username saja", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required")
  })

  it("TC_006 - Login hanya mengisi password saja", () => {
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required")
  })

  it("TC_007 - Login dengan username format email dan password special character", () => {
    cy.get('input[name="username"]').type("admin@gmail.com")
    cy.get('input[name="password"]').type("admin%")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_008 - Login dengan username hanya 1 huruf", () => {
    cy.get('input[name="username"]').type("a")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_009 - Login dengan password hanya 1 huruf", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("a")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_010 - Login dengan password ada spasi di awal dan akhir", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type(" admin123 ")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  // Catatan: OrangeHRM tidak case-sensitive, jadi ADMIN = Admin = berhasil login
  it("TC_011 - Login dengan username semua huruf kapital", () => {
    cy.get('input[name="username"]').type("ADMIN")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    // Cek apakah berhasil masuk Dashboard (sistem tidak case-sensitive)
    cy.url().should("include", "/dashboard")
  })

  it("TC_012 - Login dengan username terlalu panjang", () => {
    cy.get('input[name="username"]').type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_013 - Login dengan password terlalu panjang", () => {
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_014 - Login dengan username ada spasi di tengah", () => {
    cy.get('input[name="username"]').type("Ad min")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })
})
