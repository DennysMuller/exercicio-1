/// <reference types="cypress" />
describe('Automation Exercise, os cinco primeiros testes propostos', () => {  
    const uri = 'https://automationexercise.com/',
      timestamp = Date.now(),
      loginUser = 'Caso Teste 1',
      password = '1234',
      email = 'caso_teste_1@email.com',
      primeiroNomeEndereco = "PGATS 2 - Primeiro Nome Endereço",
      ultimoNomeEndereco = "PGATS 2 - Ultimo Nome Endereço",
      empresa = "PAGATS 2 - Empresa",
      endereco = "Rua do PGATS 2 - Endereço",
      endereco2 = "Rua do PGATS 2 - Endereço 2",
      pais = 'Austraila',
      estado = 'PGATS 2 - Estado',
      cidade = 'PGATS 2 - Cidade',
      cep = '111 222 333 444',
      cel = '1+ 9123453456'

      before(() => {
        cy.request({
            method: "DELETE",
            url: "https://automationexercise.com/api/deleteAccount",
            failOnStatusCode: false,
            form: true,
            body: {
                email: email,
                password: password,
            },
        })
    });

  it('Test Case 1: (Registrar usuário', () => {
    cy.visit(uri);
    // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
    cy.get('.logo').should('be.visible');
    // ou usando o include
    cy.url().should('include', 'automationexercise.com');
    // ou usando o equal é mais restritivo
    cy.url().should('eq', 'https://automationexercise.com/');

    // Validar página de login
    cy.get('a[href="/login"]').click();
    cy.get('.signup-form h2').should('be.visible');
    // ou conteúdo direto do texto: New User Signup!
    cy.get('.signup-form h2').should('have.text', 'New User Signup!'); 
    
    cy.get('[data-qa="signup-name"]').type(loginUser);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    // Verificar o conteúdo direto do texto: 
    cy.get('h2.title.text-center b').should('contain.text', 'Enter Account Information')
    cy.get('input[type=radio]').check('Mrs')
    cy.get('[id="password"]').type(password, { log: false });
    cy.get('select[data-qa="days"]').select('23');
    cy.get('select[data-qa="months"]').select('September');
    cy.get('select[data-qa="years"]').select('1990');

    cy.get('input[type="checkbox"]#newsletter').check();
    cy.get('input[type="checkbox"]#optin').check();

    cy.get('input#first_name').type(primeiroNomeEndereco);
    cy.get('input#last_name').type(ultimoNomeEndereco);
    cy.get('input#company').type(empresa);
    cy.get('input#address1').type(endereco);
    cy.get('input#address2').type(endereco2);
    cy.get('select#country').type(pais);
    cy.get('input#state').type(estado);
    cy.get('input#city').type(cidade);
    cy.get('[data-qa="zipcode"]').type(cep);
    cy.get('[data-qa="mobile_number"]').type(cel);
    cy.get('[data-qa="create-account"]').click();

    cy.url().should('eq', 'https://automationexercise.com/account_created');
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');

    cy.get('[data-qa="continue-button"]').click();
    // Valida que o nome de usuário aparece em negrito (<b>) na área de "Logged in as"
    cy.contains('b', loginUser).should('have.text', loginUser);

    // deletar
    cy.get('.nav.navbar-nav [href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
  });

  it("Test Case 2: Login de usuário com email e senha válidos", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('[data-qa="signup-name"]').type(loginUser);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[id="password"]').type(password, { log: false });
    cy.get('input#first_name').type(primeiroNomeEndereco);
    cy.get('input#last_name').type(ultimoNomeEndereco);
    cy.get('input#company').type(empresa);
    cy.get('input#address1').type(endereco);
    cy.get('select#country').type(pais);
    cy.get('input#state').type(estado);
    cy.get('input#city').type(cidade);
    cy.get('[data-qa="zipcode"]').type(cep);
    cy.get('[data-qa="mobile_number"]').type(cel);
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');

    cy.get('a[href="/login"]').click();
    cy.get('a[href="/logout').click();

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();

    cy.contains('b', loginUser).should('have.text', loginUser);

    // deletar
    cy.get('.nav.navbar-nav [href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('have.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
  });

  it("Test Case 3: Login de usuário com email e senha inválidos", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();
    cy.get('#form p').should('have.text', 'Your email or password is incorrect!');
  });

  it("Test Case 4: Logout de usuário", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('[data-qa="signup-name"]').type(loginUser);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get('[id="password"]').type(password, { log: false });
    cy.get('input#first_name').type(primeiroNomeEndereco);
    cy.get('input#last_name').type(ultimoNomeEndereco);
    cy.get('input#company').type(empresa);
    cy.get('input#address1').type(endereco);
    cy.get('select#country').type(pais);
    cy.get('input#state').type(estado);
    cy.get('input#city').type(cidade);
    cy.get('[data-qa="zipcode"]').type(cep);
    cy.get('[data-qa="mobile_number"]').type(cel);
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');

    cy.get('a[href="/login"]').click();
    cy.get('a[href="/logout').click();

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();

    cy.contains('b', loginUser).should('have.text', loginUser);
    cy.get('a[href="/logout').click();
    cy.get('.or').should('have.text', 'OR');

  });

  it("Test Case 5: Registrar usuário com email já cadastrado", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/login"]').click();
    cy.get('.login-form h2').should('have.text', 'Login to your account');

    cy.get('.signup-form h2').should('have.text', 'New User Signup!');

    cy.get('input[data-qa="signup-name"]').type(`loginUser - ${timestamp}}`);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('#form p').should('have.text', 'Email Address already exist!');

  });


});