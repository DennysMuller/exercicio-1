/// <reference types="cypress" />
import { fakerPT_BR as fakerPT_BR } from '@faker-js/faker';

import cadastro from '../modules/cadastro';
import { preencherFormularioDeContato } from '../modules/contato';
import { limparLoginEmailPassword } from '../support/helpers';
import { 
  navegarParaLogin, 
  efetuarLogout 
} from '../modules/menu';
import { 
  preencheFormularioDePreCadastro, 
  preencheFormularioDeLogin, 
  email, 
  loginUser,
  password 
} from '../modules/login';

describe('Automation Exercise, os cinco primeiros testes propostos', () => {  
    const uri = 'https://automationexercise.com/',
      timestamp = Date.now()

      beforeEach(() => {
        cy.visit(uri);
        // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
        cy.get('.logo').should('be.visible');
        // Ou validar usando o include
        cy.url().should('include', 'automationexercise.com');
        // ou usando o equal é mais restritivo
        cy.url().should('eq', 'https://automationexercise.com/');

        // cy.get('a[href="/login"]').click();
        navegarParaLogin();
      });

      after(() => {
        cy.request({
          method: "GET",
          url: `https://automationexercise.com/api/getUserDetailByEmail`,
          failOnStatusCode: true,
          form: false,
          qs: {
              email: email // ?email=valor_da_variavel_email
            }
        }).then((response) => {
          cy.log(response.body)
        });
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: email,
                password: password,
            },
            qs: {
                email: email // ?email=valor_da_variavel_email
              }
        }).then((response) => {
          cy.log(response.body)
        })
    });

  it("Test Case 1: Registrar usuário", () => {
    cy.get('.signup-form h2').should('be.visible');
    // ou conteúdo direto do texto: New User Signup!
    cy.get('.signup-form h2').should('have.text', 'New User Signup!');
    
    preencheFormularioDePreCadastro();
    cadastro.prencherFormularioDeCadastroCompleto();

    // Asserção
    cy.url().should('eq', 'https://automationexercise.com/account_created');
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');

    cy.get('[data-qa="continue-button"]').click();
    // Valida que o nome de usuário aparece em negrito (<b>) na área de "Logged in as"
    cy.contains('b', loginUser);

    // deletar
    //cy.get('.nav.navbar-nav [href="/delete_account"]').click();
    //cy.get('[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
    //cy.get('[data-qa="continue-button"]').click();
  });

  it("Test Case 2: Login de usuário com email e senha válidos", () => {
    cy.get('.login-form h2').should('have.text', 'Login to your account');
    preencheFormularioDeLogin();

    // Asserção
    // Samuel
    cy.get('i.fa-user').parent().should('contain', loginUser);
    cy.get('a[href="/logout').should('be.visible');
    
    // Segundo a explicação do Samuel o contains implicitamente possue o should, logo não faz sentido deixar como estava
    // cy.contains('b', loginUser).should('have.text', 'Caso Teste 1');    
    cy.contains('b', loginUser);
    // deletar
    // cy.get('.nav.navbar-nav [href="/delete_account"]').click();
    // cy.get('[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
    // cy.get('[data-qa="continue-button"]').click();
  });

  it("Test Case 3: Login de usuário com email e senha inválidos", () => {
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    // Validar email inválido
    cy.get('input[data-qa="login-email"]').type(`${email}.br`);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();

    // Asserção
    cy.get('#form p').should('have.text', 'Your email or password is incorrect!');

    // Limpar os campos
    limparLoginEmailPassword();

    // Validar senha inválida
    cy.get('input[data-qa="login-email"]').type(email); 
    cy.get('input[data-qa="login-password"]').type(`${password} `, { log: true });
    cy.get('button[data-qa="login-button"]').click();
    
    // Asserção
    cy.get('#form p').should('have.text', 'Your email or password is incorrect!');

  });

  it("Test Case 4: Logout de usuário", () => {
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    preencheFormularioDeLogin();
    
    // Asserção
    cy.contains('b', loginUser);
    cy.get('i.fa-user').parent().should('contain', 'Caso Teste 1');

    // Act
    efetuarLogout();

    // Asserção
    cy.get('.or').should('have.text', 'OR');
    cy.url().should('contain', 'login');
    cy.contains('Login to your account');
    cy.get('a[href="/logout"]').should('not.exist');
    cy.get('a[href="/login"]').should('contain', 'Signup / Login');

  });

  it("Test Case 5: Registrar usuário com email já cadastrado", () => {
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('.signup-form h2').should('have.text', 'New User Signup!');

    preencheFormularioDePreCadastro(`loginUser - ${timestamp}`);
    // cy.get('input[data-qa="signup-name"]').type(`loginUser - ${timestamp}`);
    // cy.get('input[data-qa="signup-email"]').type(email);
    // cy.get('button[data-qa="signup-button"]').click();

    // Asserção
    cy.get('#form p').should('have.text', 'Email Address already exist!');

  });

  it("Test Case 6: Enviar um formulário de contato com upload de arquivo", () => {
    // Acessar formulário
    cy.get('a[href*=contact]').click()

    // Formulário e nexar arquivo 
    preencherFormularioDeContato();

    // cy.fixture('Lula_Ladrão.png').as('arquivo')
    // cy.get('input[type=fiLe]').selectFile('@arquivo')
    // cy.get('input[type=file] ') .selectFile('cypress/fixtures/example.json')
    // cy.get('[name="upload_file"]').selectFile('@arquivo')

    cy.get('[data-qa="submit-button"]').click()

    // asserts
    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
  });
}); 