describe('Reservation Form', () => {
  beforeEach(() => {
    cy.navegateToReservationForm()
  })
  
  it("TC-RES-01 - Reserva exitosa con datos válidos", () => {
    cy.intercept('POST', '**/booking').as('crearReserva')
    cy.fixture('reservationData').then((datos) => {
       const valid = datos.validReservation
       cy.get('[name="firstname"]').type(valid.nombre)
       cy.get('[name="lastname"]').type(valid.apellido)
       cy.get('[name="email"]').type(valid.email)
       cy.get('[name="phone"]').type(valid.telefono)
     })
    cy.get('.btn-primary').click()
    // Validación de reserva exitosa
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 201)
    cy.contains('Booking Confirmed').should('be.visible')
  })

  it("TC-RES-02 - Reserva con campos vacíos", () => {
    cy.intercept('POST', '**/booking').as('crearReserva')
    cy.get('.btn-primary').click()
    // Validación de errores por campos vacíos
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 400)
    cy.contains('Firstname should not be blank').should('be.visible')
    cy.contains('Lastname should not be blank').should('be.visible')
    cy.contains('must not be empty').should('be.visible')
  })

  it("TC-RES-03 - Reserva con limites de caracteres exactos", () => {
    cy.intercept('POST', '**/booking').as('crearReserva')
    cy.fixture('reservationData').then((datos) => {
      const limitReservation = datos.exactCaracterLimitReservation
      cy.get('[name="firstname"]').type(limitReservation.nombre)
      cy.get('[name="lastname"]').type(limitReservation.apellido)
      cy.get('[name="email"]').type(limitReservation.email)
      cy.get('[name="phone"]').type(limitReservation.telefono)
    })
    cy.get('.btn-primary').click()
    // Validación de reserva exitosa
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 201)
    cy.contains('Booking Confirmed').should('be.visible')
  })

  it("TC-RES-04 - Intento de reserva con telefono de menos de 10 digitos", () => {
    cy.intercept('POST', '**/booking').as('crearReserva')
    cy.fixture('reservationData').then((datos) => {
      const valid = datos.validReservation
      const invalidPhone = "123456789" // Teléfono con menos de 10 dígitos
      cy.get('[name="firstname"]').type(valid.nombre)
      cy.get('[name="lastname"]').type(valid.apellido)
      cy.get('[name="email"]').type(valid.email)
      cy.get('[name="phone"]').type(invalidPhone)
    })
    cy.get('.btn-primary').click()
    // Validación de error por teléfono inválido
    cy.wait('@crearReserva').its('response.statusCode').should('eq', 400)
    cy.contains('size must be between 11 and 21').should('be.visible')
  })
})