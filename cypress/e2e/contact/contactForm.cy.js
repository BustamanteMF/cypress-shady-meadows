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

  it('TC-CON-02 - Envío de mensaje con formato de mail inválido', () => {
    cy.fixture('contactData').then((datos) => {
      const valid = datos.validMessage
      const invalid = datos.invalidMessage
      cy.get('[data-testid="ContactName"]').type(valid.name)
      cy.get('[data-testid="ContactEmail"]').type(invalid.email)
      cy.get('[data-testid="ContactPhone"]').type(valid.phone)
      cy.get('[data-testid="ContactSubject"]').type(valid.subject)
      cy.get('[data-testid="ContactDescription"]').type(valid.description)
      cy.intercept('POST', '/api/message').as('postMessageRequest')
      cy.get('.d-grid > .btn').click()
      cy.wait('@postMessageRequest').its('response.statusCode').should('eq', 400)
      cy.get('#contact').should('not.contain', 'Thanks for getting in touch '+ valid.name)
      cy.get('.alert').should('contain', 'must be a well-formed email address')
      cy.reload()
    })
  })

  it('TC-CON-03 - Envío de mensaje con longitud mínima de caracteres', () => {
    cy.fixture('contactData').then((datos) => {
      const short = datos.shortMessage
      cy.get('[data-testid="ContactName"]').type(short.name)
      cy.get('[data-testid="ContactEmail"]').type(short.email)
      cy.get('[data-testid="ContactPhone"]').type(short.phone)
      cy.get('[data-testid="ContactSubject"]').type(short.subject)
      cy.get('[data-testid="ContactDescription"]').type(short.description)
      cy.intercept('POST', '/api/message').as('postMessageRequest')
      cy.get('.d-grid > .btn').click()
      cy.wait('@postMessageRequest').its('response.statusCode').should('eq', 400)
      cy.get('#contact').should('not.contain', 'Thanks for getting in touch '+ short.name)
      cy.get('.alert').should('contain', 'Message must be between 20 and 2000 characters')
      cy.checkFormRetention(short)
      cy.reload()
    })
  })

  it('TC-CON-04 - Envío de mensaje con limite exacto de caracteres', () => {
    cy.fixture('contactData').then((datos) => {
      const exact = datos.exactLimitMessage
      cy.get('[data-testid="ContactName"]').type(exact.name)
      cy.get('[data-testid="ContactEmail"]').type(exact.email)
      cy.get('[data-testid="ContactPhone"]').type(exact.phone)
      cy.get('[data-testid="ContactSubject"]').type(exact.subject)
      cy.get('[data-testid="ContactDescription"]').type(exact.description)
      cy.intercept('POST', '/api/message').as('postMessageRequest')
      cy.get('.d-grid > .btn').click()
      cy.wait('@postMessageRequest').its('response.statusCode').should('eq', 200)
      cy.get('#contact').should('contain', 'Thanks for getting in touch '+ exact.name)
        .and('contain', exact.subject)
        .and('not.contain', 'Send Us a Message')
      cy.reload()
    })
  })
})