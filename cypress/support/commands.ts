/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(email: string, password: string): Chainable<Subject>;
        generateString(length: number): string;
        setup(url: string): Chainable<Subject>;
    }
  }

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('#normal_login_email').type(email);
    cy.get('#normal_login_password').type(password);
    cy.get('button[type=submit]').click();
});


Cypress.Commands.add('setup', (url: string) => {
    cy.fixture('url').then((url) => {
        cy.visit(url.url)
    })
    cy.get('button').contains('Anmelden').click()
    cy.fixture('user').then((user) => {
        cy.login(user.existing_user.email, user.existing_user.password)
    })
    cy.get('.ant-tour-next-btn').click()
    
    cy.visit(url)
    
});

// This Command is used to generate names and emails that not exist in the database
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
Cypress.Commands.add('generateString', (length: number) => {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
});

