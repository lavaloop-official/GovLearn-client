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
    }
  }

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('#normal_login_email').type(email);
    cy.get('#normal_login_password').type(password);
    cy.get('button[type=submit]').click();
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

