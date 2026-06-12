describe("Login OrangeHRM - Intercept", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  })

  it("TC_001 - Login berhasil dan intercept status 302 redirect ke dashboard", () => {
    cy.intercept("POST", "**/auth/validate").as("requestLogin")
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestLogin").then((interception) => {
      expect(interception.response.statusCode).to.equal(302)
      const location = interception.response.headers["location"]
      expect(location).to.include("dashboard")
    })

    cy.url().should("include", "/dashboard")
  })

  it("TC_002 - Login password salah dan intercept redirect kembali ke halaman login", () => {
    cy.intercept("POST", "**/auth/validate").as("requestLoginGagal")
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("passwordsalah")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestLoginGagal").then((interception) => {
      expect(interception.response.statusCode).to.equal(302)
      const location = interception.response.headers["location"]
      expect(location).to.include("auth")
    })
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_003 - Login tanpa isi apapun dan intercept GET halaman login status 200", () => {
    cy.intercept("GET", "**/auth/login").as("halamanLogin")
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.wait("@halamanLogin").then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get('button[type="submit"]').click()
    cy.get(".oxd-input-field-error-message").should("have.length.at.least", 2)
    cy.get(".oxd-input-field-error-message").first().should("contain.text", "Required")
  })

  it("TC_004 - Login username salah dan intercept redirect balik ke halaman login", () => {
    cy.intercept("POST", "**/auth/validate").as("requestUsernameGagal")
    cy.get('input[name="username"]').type("UsernameYangSalah")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestUsernameGagal").then((interception) => {
      expect(interception.response.statusCode).to.equal(302)
      const location = interception.response.headers["location"]
      expect(location).to.not.include("dashboard")
    })
    cy.get(".oxd-alert-content-text").should("contain.text", "Invalid credentials")
  })

  it("TC_005 - Login berhasil dan intercept cek method request adalah POST", () => {
    cy.intercept("POST", "**/auth/validate").as("requestCekMethod")
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestCekMethod").then((interception) => {
      expect(interception.request.method).to.equal("POST")
      expect(interception.response.statusCode).to.equal(302)
    })
    cy.url().should("include", "/dashboard")
  })

  it("TC_006 - Intercept dan mock response server error 500", () => {
    cy.intercept("POST", "**/auth/validate", {
      statusCode: 500,
      body: "Internal Server Error"
    }).as("requestServerError")

    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestServerError").then((interception) => {
      expect(interception.response.statusCode).to.equal(500)
    })
  })

  it("TC_007 - Intercept dan mock response server 403 forbidden", () => {
    cy.intercept("POST", "**/auth/validate", {
      statusCode: 403,
      body: "Forbidden"
    }).as("requestForbidden")

    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestForbidden").then((interception) => {
      expect(interception.response.statusCode).to.equal(403)
    })
  })

  it("TC_008 - Login berhasil dan intercept cek URL request mengandung auth/validate", () => {
    cy.intercept("POST", "**/auth/validate").as("requestCekURL")
    cy.get('input[name="username"]').type("Admin")
    cy.get('input[name="password"]').type("admin123")
    cy.get('button[type="submit"]').click()
    cy.wait("@requestCekURL").then((interception) => {
      expect(interception.request.url).to.include("auth/validate")
      expect(interception.response.statusCode).to.equal(302)
    })
    cy.url().should("include", "/dashboard")
  })
})