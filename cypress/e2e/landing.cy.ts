describe('button', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('open_website', () => {
    cy.url().should('include', 'localhost')
  })
  it('open_register', () => {
    cy.get('.animated-button').click()
    cy.get('#normal_login').should('be.visible')
  })
  it('close_register', () => {
    cy.get('.animated-button').click()
    cy.get('#normal_login').should('exist')
    cy.get('.ant-modal-close').click()
    cy.get('#normal_login').should('not.be.visible')
  })
})

describe('register_form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.get('.animated-button').click()
  })

  // email should be in correct format (e.g. test@test)
  it('mail_correct_input', () => {
    cy.get('#normal_login_email').type('test')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('be.visible')
  })
  it('mail_incorrect_input', () => {
    cy.get('#normal_login_email').type('test@test')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('not.be.visible')
  })

  // password should be at least 8 characters
  it('password_short_input', () => {
    cy.get('#normal_login_password').type('test')
    cy.get('#normal_login_password_repeat').type('test')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('be.visible')
  })
  it('password_wrong_repeat', () => {
    cy.get('#normal_login_password').type('testtest')
    cy.get('#normal_login_password_repeat').type('test')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('be.visible')
  })
  it('password_correct_input', () => {
    cy.get('#normal_login_password').type('testtest')
    cy.get('#normal_login_password_repeat').type('testtest')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('not.be.visible')
  })

  // switch from register to login
  it('switch_to_login', () => {
    cy.get("a:contains('haben Sie schon einen Account?')").click()
    cy.get('.ant-modal-title').should('contain', 'Anmelden')
  })
})

  