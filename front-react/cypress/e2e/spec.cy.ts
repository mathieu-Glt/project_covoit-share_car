describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5175/')
    cy.get('input[name=email]').type('')
    cy.get('input[name=password]').type('Mg!2023@1985/*')
    // cy.get('form').submit()
    cy.get('.btn').click()
  })
})