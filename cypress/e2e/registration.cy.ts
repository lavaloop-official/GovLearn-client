describe('navigation', () => {
    beforeEach(() => {
        let random_name = 'name' + new Date().toLocaleTimeString().replace(/:/g, '');
        let random_mail = random_name + '@test.com';
        let random_password = random_name;
        cy.fixture('url').then((url) => {
            cy.visit(url.url)
        })
        cy.get('.animated-button').click()
        cy.get('#normal_login_name').type(random_name.toString())
        cy.get('#normal_login_email').type(random_mail.toString())
        cy.get('#normal_login_password').type(random_password.toString())
        cy.get('#normal_login_password_repeat').type(random_password.toString())
        cy.get('button[type="submit"]').click()
    })
    it(('register_start'), () => {
        cy.url().should('include', 'register')
    })
    it(('navigation-steps'), () => {
        cy.get('.ant-steps-item-container').contains('Kompetenzen').click()
        cy.url().should('include', 'register/competences')
        cy.get('.ant-steps-item-container').contains('Rollen').click()
        cy.url().should('include', 'register/roles')
        cy.get('.ant-steps-item-container').contains('Einführung').click()
        cy.url().should('include', 'register/onboarding')
    })
    it(('navigation-buttons'), () => {
        cy.get('.ant-btn').contains('Weiter').click()
        cy.url().should('include', 'register/roles')
        cy.get('.ant-btn').contains('Weiter').click()
        cy.url().should('include', 'register/competences')
    });
})

describe('tag_selection', () => {
    beforeEach(() => {
        // register values
        let random_name = 'name' + new Date().toLocaleTimeString().replace(/:/g, '');
        let random_mail = random_name + '@test.com';
        let random_password = random_name;
        cy.fixture('url').then((url) => {
            cy.visit(url.url)
        })
        // register
        cy.get('.animated-button').click()
        cy.get('#normal_login_name').type(random_name.toString())
        cy.get('#normal_login_email').type(random_mail.toString())
        cy.get('#normal_login_password').type(random_password.toString())
        cy.get('#normal_login_password_repeat').type(random_password.toString())
        cy.get('button[type="submit"]').click()
        // tag selection
        cy.get('.ant-btn').contains('Weiter').click()
    })
    /*it(('tag_selection'), () => {
        cy.get('path').contains('Digitalisierung').click()
        cy.get('g').contains('Stratege').click()
        cy.get('ant-tag-blue').contains('Digitalisierung').should('exist')
        cy.get('ant-tag-blue').contains('Stratege').should('exist')
    })*/
})
