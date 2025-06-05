describe('Pruebas de autenticación y perfil', () => {
  const dynamicUser = {
    username: 'testuser_' + Date.now(),
    email: 'testuser_' + Date.now() + '@example.com',
    password: 'TestPass123!'
  }

  const invalidUser = {
    email: 'noexiste_' + Date.now() + '@dominio.com',
    password: 'Password123!'
  }

  // Escenario 1: Registro con usuario dinámico en la página /signup
  it('Escenario 1: Registro directo desde /signup', () => {
    cy.visit('http://localhost:3001/signup')

    cy.get('input[name="username"]').clear().type(dynamicUser.username)
    cy.get('input[name="email"]').clear().type(dynamicUser.email)
    cy.get('input[name="password"]').clear().type(dynamicUser.password)
    cy.contains('Create account').click()
    cy.contains('¡Registro exitoso!', { timeout: 10000 }).should('be.visible')
    cy.url({ timeout: 10000 }).should(url => {
      expect(url).not.to.include('/signup')
    })
  })

  // Escenario 9: Intentar login con un usuario que no existe en la base de datos
  it('Escenario 9: Login con usuario inexistente', () => {
    cy.visit('http://localhost:3001/login')

    cy.get('input[name="email"]').type(invalidUser.email)
    cy.get('input[name="password"]').type(invalidUser.password)
    cy.contains('Continue').click()
    cy.url().should('include', '/login')
    cy.contains('Error al iniciar sesión', { timeout: 10000 }).should('be.visible')
  })
})
