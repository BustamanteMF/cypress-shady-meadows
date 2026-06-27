# QA Automation | Shady Meadows

Automatización E2E (Frontend y API) para el sistema de reservas hoteleras Shady Meadows, utilizando Cypress y JavaScript. Este repositorio busca demostrar buenas prácticas de QA, diseño de casos de prueba y reporte de bugs.

## Tecnologías Utilizadas
* **Framework:** Cypress
* **Lenguaje:** JavaScript
* **Entorno:** Node.js

## Gestión y Documentación
Todo el ciclo de vida del testing (desde el diseño hasta el reporte de incidencias) está documentado de forma pública:
* **[Tablero de Trello (Bug Tracking & Kanban)](https://trello.com/invite/b/6a404847372883b8d6afeb81/ATTI9edf2c1d49e7b978af52db013d994b8bFC48664D/e2e-testing-bug-tracking-shady-meadows)**: Gestión visual de tareas, automatizaciones en progreso y reporte detallado de bugs (incluyendo el Error #418 de React y validaciones de UI).
* **[Casos de Prueba (Google Sheets)](https://docs.google.com/spreadsheets/d/1yhUqaCCt_cJqIfMUWSDG-QfNrxmWUx8K-BIwGtCUF_U/edit?usp=sharing)**: Diseño de escenarios positivos y negativos.

## Instalación y Ejecución

Si deseas clonar este repositorio y ejecutar las pruebas localmente:

1. Clona el repositorio [https://github.com/BustamanteMF/cypress-shady-meadows.git](https://github.com/BustamanteMF/cypress-shady-meadows.git):
   ```bash
   git clone https://github.com/BustamanteMF/cypress-shady-meadows.git
   ```
2. Instala las dependencias:
   ```bash
   npm install 
   ```
3. Ejecuta Cypress (Modo Interactivo):
   ```bash
   npx cypress open 
   ```

## Buenas Prácticas Implementadas

* **Custom Commands**: Creación de comandos reutilizables para optimizar el código (ej: generación de fechas dinámicas para evitar colisiones de datos).

* **Intercepción de API (`cy.intercept`)**: Validación de respuestas del backend (Status 201) y manejo seguro de peticiones antes de aserciones en la UI.

* **Manejo de Excepciones**: Configuración para ignorar errores internos de la aplicación (uncaught:exception) que no afectan el flujo del usuario.

* **Separación de Datos**: Uso de fixtures para aislar los datos de prueba del código de automatización.