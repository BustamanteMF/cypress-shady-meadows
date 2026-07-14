// Este archivo contiene comandos personalizados de Cypress para la creación de habitaciones en la aplicación Shady Meadows.
Cypress.Commands.add('createRoom', (roomName) => {
  cy.intercept('POST', '/api/room').as('createRoomRequest')

  cy.get('#roomName').type(roomName)
  cy.get('select#type').select('Twin')
  cy.get('select#accessible').select('true')
  cy.get('#roomPrice').type('120')
  cy.get(':nth-child(1) > :nth-child(1) > .form-check > [name="featureCheck"]').click()
  cy.get(':nth-child(2) > :nth-child(3) > .form-check > [name="featureCheck"]').click()
  cy.get('#createRoom').click()

  cy.wait('@createRoomRequest').its('response.statusCode')
})

