
// NAVEGATE TO RESERVATION FORM
// Visita la página principal, genera fechas dinámicas y abre el formulario de la primera habitación disponible.

Cypress.Commands.add('navegateToReservationForm', () => {
  cy.visit('/')
  
  // Abre el calendario y carga las fechas dinámicas
  cy.get('.col-lg-8 > .btn').click()
  cy.fillValidDates()
  
  // Realiza la búsqueda de habitaciones
  cy.get('.col-8 > .btn').click()
  
  // Selecciona la primera habitación de la lista y confirma
  cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
  cy.get('#doReservation').click()
})


// FILL VALID DATES
// Genera e ingresa fechas aleatorias en el futuro para evitar colisión de datos (Error 409).

Cypress.Commands.add('fillValidDates', () => {
  // Calculamos un salto aleatorio y una estadía de 5 días
  const randomDaysIntoFuture = Math.floor(Math.random() * 290) + 10; 

  const fechaCheckIn = new Date();
  fechaCheckIn.setDate(fechaCheckIn.getDate() + randomDaysIntoFuture);
  const checkInStr = fechaCheckIn.toISOString().split('T')[0]; 

  const fechaCheckOut = new Date();
  fechaCheckOut.setDate(fechaCheckOut.getDate() + randomDaysIntoFuture + 5);
  const checkOutStr = fechaCheckOut.toISOString().split('T')[0];

  // Limpiamos e ingresamos las fechas calculadas
  cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
    .clear()
    .type(`${checkInStr}{enter}`, { force: true })

  cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control')
    .clear()
    .type(`${checkOutStr}{enter}`, { force: true })
})