// Nama   : Hilman Aditya
// Tanggal: 06/06/2026
// Website yang diuji: https://api.escuelajs.co/api/v1/categories

describe("API Testing - Categories (Platzi Fake Store API)", () => {

  const baseUrl = "https://api.escuelajs.co/api/v1/categories"
  it("Request 1 - GET semua categories berhasil status 200", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an("array")
    })
  })

  it("Request 2 - GET categories dan cek data pertama memiliki field id", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("id")
    })
  })

  it("Request 3 - GET categories dan cek data pertama memiliki field name", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("name")
    })
  })

  it("Request 4 - GET categories dan cek data pertama memiliki field image", () => {
    cy.request("GET", baseUrl).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body[0]).to.have.property("image")
    })
  })

  it("Request 5 - GET category dengan id 1 berhasil status 200", () => {
    cy.request("GET", `${baseUrl}/1`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(1)
    })
  })

  it("Request 6 - GET category dengan id 2 berhasil status 200", () => {
    cy.request("GET", `${baseUrl}/2`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(2)
    })
  })

  it("Request 7 - GET category dengan id 3 dan cek nama tidak kosong", () => {
    cy.request("GET", `${baseUrl}/3`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.not.be.null
    })
  })

  it("Request 8 - GET category dengan id tidak ada (99999) menghasilkan error", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/99999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property("message")
    })
  })

  it("Request 9 - POST tambah category baru berhasil status 201", () => {
    const categoryBaru = {
      name: `Kategori Test Hilman ${Date.now()}`,
      image: "https://placeholder.com/150"
    }
    cy.request("POST", baseUrl, categoryBaru).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq(categoryBaru.name)
    })
  })

  it("Request 10 - PUT update category id 1 berhasil status 200", () => {
    const dataUpdate = {
      name: `Kategori Sudah Diupdate ${Date.now()}`
    }

    cy.request("PUT", `${baseUrl}/1`, dataUpdate).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq(dataUpdate.name)
    })
  })

  it("Request 11 - GET categories dengan parameter limit=3 mengembalikan 3 data", () => {
    cy.request("GET", `${baseUrl}?limit=3`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(3)
    })
  })

  it("Request 12 - DELETE category berhasil mengembalikan status 200", () => {
    const categoryUntukDihapus = {
      name: `Kategori Akan Dihapus ${Date.now()}`,
      image: "https://placeholder.com/150"
    }

    cy.request("POST", baseUrl, categoryUntukDihapus).then((createResponse) => {
      const idBaru = createResponse.body.id
      cy.request("DELETE", `${baseUrl}/${idBaru}`).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200)
        expect(deleteResponse.body).to.eq("true")
      })
    })
  })
})
