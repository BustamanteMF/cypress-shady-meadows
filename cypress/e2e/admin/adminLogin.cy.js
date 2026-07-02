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
})