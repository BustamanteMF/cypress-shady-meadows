describe('Contact Form', () => {

  beforeEach(() => {
    cy.visit('/#contact')
  })
  
  it('TC-CON-01 - Envío exitoso de mensaje de contacto', () => {
    cy.fixture('contactData').then((datos) => {
      const valid = datos.validMessage
      cy.get('[data-testid="ContactName"]').type(valid.name)
      cy.get('[data-testid="ContactEmail"]').type(valid.email)
      cy.get('[data-testid="ContactPhone"]').type(valid.phone)
      cy.get('[data-testid="ContactSubject"]').type(valid.subject)
      cy.get('[data-testid="ContactDescription"]').type(valid.description)
      cy.intercept('POST', '/api/message').as('postMessageRequest')
      cy.get('.d-grid > .btn').click()
      cy.wait('@postMessageRequest').its('response.statusCode').should('eq', 200)
      cy.get('#contact').should('contain', 'Thanks for getting in touch '+ valid.name)
        .and('contain', valid.subject)
        .and('not.contain', 'Send Us a Message')
      cy.reload()
    })
  })
})