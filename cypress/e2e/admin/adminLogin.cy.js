describe('Admin - Login', () => {
  
  it("TC-ADM-01 - Login exitoso con credenciales válidas", () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest')
    cy.fixture('loginAdminData').then((datos) => {
      const valid = datos.validAdmin
      cy.loginAsAdmin(valid.username, valid.password)
    })
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200)
    cy.contains('Logout').should('be.visible')
    cy.url().should('include', '/admin/rooms')
    })
  
  it("TC-ADM-02 - Login fallido con credenciales inválidas", () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest')
    cy.fixture('loginAdminData').then((datos) => {
      const validUser = datos.validAdmin.username
      const invalidPassword = datos.invalidAdmin.password
      cy.loginAsAdmin(validUser, invalidPassword)
    })
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', '/admin')
  })

  it.only("TC-ADM-03 - Login fallido con campos vacíos", () => {
    cy.intercept('POST', '/api/auth/login').as('loginRequest')
    cy.visit('/admin')
    cy.get('#username').clear()
    cy.get('#password').clear()
    cy.get('#doLogin').click()
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 401)
    cy.contains('Invalid credentials').should('be.visible')
    cy.url().should('include', '/admin')
  })
})