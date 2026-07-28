describe('Admin - Messeges', () => {
  beforeEach(() => {
    cy.fixture('contactData').then((datos) => {
      const valid = datos.validMessage
      cy.request({
        method: 'POST',
        url: '/api/message', 
        body: {
          "name":valid.name,
          "email":valid.email,
          "phone":valid.phone,
          "subject":valid.subject,
          "description":valid.description
        }
      })
    })
    cy.fixture('loginAdminData').then((datos) => {
      const valid = datos.validAdmin
      cy.loginAsAdmin(valid.username, valid.password)
    })
  })

  it('TC-ADM-08 - Verificar la visualización de mensajes', () => {
    cy.get('.navbar').contains('Messages').click()
    cy.url().should('include', '/admin/message')
    cy.intercept('GET', '/api/message/*').as('getMessagesRequest')

    cy.fixture('contactData').then((datos) => {
      const valid = datos.validMessage
      cy.get('#root-container > :nth-child(1)').contains(valid.subject).click()
      cy.wait('@getMessagesRequest').its('response.statusCode').should('eq', 200)
      cy.get('.ReactModal__Content')
        .should('be.visible')
        .and('contain', valid.subject)
        .and('contain', 'Phone: ' + valid.phone)
        .and('contain', 'Email: ' + valid.email)
        .contains('Close').click()
        .should('not.exist')
      cy.get('#root-container > :nth-child(1)').contains(valid.subject)
        .closest('.row')
        .should('have.class', 'read-true')
        .find('.fa-remove.roomDelete') // borro el mensaje para que no quede en la lista de mensajes
        .click()
    })
  })
})