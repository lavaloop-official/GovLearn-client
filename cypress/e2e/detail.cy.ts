describe('Feedback', () => {
    beforeEach(() => {
        cy.fixture('url').then((url) => {
            cy.setup(url.url + 'detail/1')
        })
    })
    it('send_feedback', () => {
        // post feedback
            cy.intercept('POST','http://localhost:8080/api/v1/feedback').as('feedback')
            cy.scrollTo('bottom')
            cy.contains('Bewertung abgeben').click()
            cy.get('.ant-rate-star').eq(6).click()
            cy.get('#title').type('Test')
            cy.get('textarea').type('Test')
            cy.get('button[type="submit"]').click()
            cy.wait('@feedback').its('response.statusCode').should('eq', 200)

        cy.reload()
            
        // delete feedback
            cy.intercept('DELETE','http://localhost:8080/api/v1/feedback/*').as('delete_feedback')
            cy.get('#feedback-delete').click()
            cy.get('.ant-btn-dangerous').contains('Ja').click()
            cy.wait('@delete_feedback').its('response.statusCode').should('eq', 200)
    })

    
})