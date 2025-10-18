/// <reference types="cypress" />
import dataForm from '../fixtures/dadosExercicio-3.json';

describe('Automation Exercise, os cinco primeiros testes propostos', () => {  
    const uri = 'https://automationexercise.com/'
    
    it('Exercicio 2: (Enviar um formulário de contato com upload de arquivo)', () => {
      cy.visit(uri);
      // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
      cy.get('.logo').should('be.visible');
      // ou usando o include
      cy.url().should('include', 'automationexercise.com');
      // ou usando o equal é mais restritivo
      cy.url().should('eq', 'https://automationexercise.com/');

      // Enviar formulário
      cy.get('a[href*=contact]').click()

      cy.get('[data-qa="name"]').type(dataForm.name)
      cy.get('[data-qa="email"]').type(dataForm.email)
      cy.get('[data-qa="subject"]').type(dataForm.subject)
      cy.get('[data-qa="message"]').type(dataForm.message)

      cy.fixture('Lula_Ladrão.png').as('arquivo')
      cy.get('input[type=fiLe]').selectFile('@arquivo')
      // cy.get('input[type=file] ') .selectFile('cypress/fixtures/example.json')
      // cy.get('[name="upload_file"]').selectFile('@arquivo')

      cy.get('[data-qa="submit-button"]').click()

      // asserts
      cy.get('.status').should('be.visible')
      cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')         
  });
});