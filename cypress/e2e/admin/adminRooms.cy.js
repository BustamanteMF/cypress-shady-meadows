describe("Admin - Rooms", () => {
  beforeEach(() => {
    cy.fixture('loginAdminData').then((datos) => {
      const valid = datos.validAdmin
      cy.loginAsAdmin(valid.username, valid.password)
    })
  })

  it("TC-ADM-04 - Crear una nueva habitación con datos válidos", () => {
    cy.intercept('POST', '/api/room').as('createRoomRequest')

    cy.get('#roomName').type('105')
    cy.get('select#type').select('Twin')
    cy.get('select#accessible').select('true')
    cy.get('#roomPrice').type('120')
    cy.get(':nth-child(1) > :nth-child(1) > .form-check > [name="featureCheck"]').click()
    cy.get(':nth-child(2) > :nth-child(3) > .form-check > [name="featureCheck"]').click()
    cy.get('#createRoom').click()

    cy.wait('@createRoomRequest').its('response.statusCode').should('eq', 200)
    cy.get('#root-container > :nth-child(1)').contains('105').should('be.visible')
    // Verifica que los campos del formulario se han restablecido después de crear la habitación
    cy.get('[type="text"]').should('have.value', '')
    cy.get('[type="checkbox"]').should('not.be.checked')
    cy.get('#type').should('have.value', 'Single')
    cy.get('#accessible').should('have.value', 'false')
  })
})