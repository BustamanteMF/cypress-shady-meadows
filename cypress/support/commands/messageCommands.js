// Verifica que los campos del formulario de contacto retengan la información ingresada después de un intento de envío fallido.
Cypress.Commands.add('checkFormRetention', (fixture) => {
  cy.get('[data-testid="ContactName"]').should('have.value', fixture.name)
  cy.get('[data-testid="ContactEmail"]').should('have.value', fixture.email)
  cy.get('[data-testid="ContactPhone"]').should('have.value', fixture.phone)
  cy.get('[data-testid="ContactSubject"]').should('have.value', fixture.subject)
  cy.get('[data-testid="ContactDescription"]').should('have.value', fixture.description)
})