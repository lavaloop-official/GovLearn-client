describe('Tour', () => {
    beforeEach(() => {
        cy.fixture('url').then((url) => {
            cy.visit(url.url)
        })
        cy.get('button').contains('Anmelden').click()
        cy.fixture('user').then((user) => {
            cy.login(user.existing_user.email, user.existing_user.password)
        })
    })
    it('tour_navigation', () => {
        cy.get('.ant-tour').should('be.visible')
        cy.get('.ant-tour-title').contains('Empfehlungen').should('be.visible')
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-title').contains('Weitere Empfehlungen').should('be.visible')
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-title').contains('Ansicht').should('be.visible')
    })
})
describe('Discovery', () => {
    beforeEach(() => {
        cy.fixture('url').then((url) => {
            cy.visit(url.url)
        })
        cy.get('button').contains('Anmelden').click()
        cy.fixture('user').then((user) => {
            cy.login(user.existing_user.email, user.existing_user.password)
        })
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-next-btn').click()

    })
    it('group_navigation', () => {
        cy.get('.ant-btn-text').contains('Gruppen').click()
        cy.url().should('include', '/groups')
        cy.get('.ant-btn-text').contains('Gruppen').should('have.css', 'font-weight', '700')
    })
    it('profile_navigation', () => {
        cy.get('.ant-btn-text').contains('Profil').click()
        cy.url().should('include', '/profile')
        cy.get('.ant-btn-text').contains('Profil').should('have.css', 'font-weight', '700')
    })
    it('bookmark', () => {
        cy.intercept('http://localhost:8080/api/v1/bookmarks/*').as('bookmark');
        cy.get('.bookmark-outer').should('be.visible')
    })
})  

describe('Recommendation', () => {
    beforeEach(() => {
        cy.fixture('url').then((url) => {
            cy.visit(url.url)
        })
        cy.intercept('http://localhost:8080/api/v1/recommendations/bundle').as('recommendation')
        cy.get('button').contains('Anmelden').click()
        cy.fixture('user').then((user) => {
            cy.login(user.existing_user.email, user.existing_user.password)
        })
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-next-btn').click()
        cy.get('.ant-tour-next-btn').click()
    })
    it('recommendation_navigation', () => {
        cy.scrollTo('top')
        cy.get('.ant-btn-primary').contains('Weiterlesen').click()
        cy.url().should('include', '/detail')
    })
    it('recommendation', () => {
        cy.wait('@recommendation').then((interception) => {
            expect((interception.response as any).statusCode).to.eq(200);
            const responseBody = interception.response?.body;

            expect(responseBody).to.have.property('payload');
            expect(responseBody).to.have.property('messages');

            const payload = responseBody?.payload;

            expect(payload).to.have.property('featured').and.to.be.an('array');

            expect(payload).to.have.property('categorized').and.to.be.an('array');

      const categorizedItems = payload.categorized;
      categorizedItems.forEach((category: any) => {
        expect(category).to.have.property('category').and.to.be.a('string');
        expect(category).to.have.property('items').and.to.be.an('array');

        });
    })
})

})

