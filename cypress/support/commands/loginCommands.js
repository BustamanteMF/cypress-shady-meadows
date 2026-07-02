Cypress.Commands.add('loginAsAdmin', (username, password) => {
    cy.visit('/admin')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#doLogin').click()
})