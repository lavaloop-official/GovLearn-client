describe('button', () => {
  beforeEach(() => {
    cy.fixture('url').then((url) => {
      cy.visit(url.url)
    })
  })
  it('open_website', () => {
    cy.fixture('url').then((url) => {
      cy.url().should('include', 'localhost')
    })
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
    cy.fixture('url').then((url) => {
      cy.visit(url.url)
    })
    cy.get('.animated-button').click()
  })

  // email should be in correct format (e.g. test@test)
  it('mail_incorrect_input', () => {
    cy.get('#normal_login_email').type('test')
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('be.visible')
  })
  it('mail_correct_input', () => {
    cy.fixture('user').then((user) => {
      cy.get('#normal_login_email').type(user.existing_user.email)
    })
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
    cy.fixture('user').then((user) => {
      cy.get('#normal_login_password').type(user.existing_user.password)
      cy.get('#normal_login_password_repeat').type(user.existing_user.password)
    })
    cy.get('button[type="submit"]').click()
    cy.get('.ant-form-item-explain-error').should('not.be.visible')
  })

  // switch from register to login
  it('switch_to_login', () => {
    cy.get("a:contains('haben Sie schon einen Account?')").click()
    cy.get('.ant-modal-title').should('contain', 'Anmelden')
  })
})

describe('login_form', () => {
  beforeEach(() => {
    cy.fixture('url').then((url) => {
      cy.visit(url.url)
    })
    cy.get('button').contains('Anmelden').click()
  })
  it('correct_login', () => {
    cy.fixture('user').then((user) => {
      cy.login(user.existing_user.email, user.existing_user.password)
  })
    // Discover page is accessed after login
    cy.url().should('include', 'discover')
  })
  it('wrong_login', () => {
    cy.fixture('user').then((user) => {
      cy.login(user.not_existing_user.email, user.not_existing_user.password)
  })
    cy.get('.ant-alert-message').contains('Die eingegebenen Anmeldedaten sind nicht korrekt!').should('be.visible')
  })
  it('forgot_password', () => {
    cy.get("a:contains('Passwort vergessen?')").click()
    cy.get('.ant-modal-title').should('contain', 'Passwort vergessen')
    cy.get("a:contains('erinnern Sie sich wieder an Ihr Passwort?')").click()
    cy.get('.ant-modal-title').should('contain', 'Anmelden')
  })
})
  