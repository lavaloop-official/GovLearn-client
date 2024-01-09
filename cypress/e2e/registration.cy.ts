describe('navigation', () => {
    beforeEach(() => {
        let random_name = cy.generateString(7);
        let random_mail = random_name + '@test.com';
        let random_password = cy.generateString(8);
        console.log(random_name)
        cy.fixture('url').then((url) => {
        cy.visit(url.url)
        })
        console.log(typeof random_name)
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
})

