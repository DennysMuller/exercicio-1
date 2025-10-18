/// <reference types="cypress" />
require('cypress-xpath');

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
      pais = 'Australia',
      estado = 'PGATS 2 - Estado',
      cidade = 'PGATS 2 - Cidade',
      cep = '111 222 333 444',
      cel = '1+ 9123453456'

    beforeEach(() => {
      cy.visit(uri);
      // Validar se a logo está visível, para clicar na logo cy.get('.logo a').click();
      cy.xpath("//*[contains(@class, 'logo')]").should('be.visible');
      // ou usando o include
      cy.url().should('include', 'automationexercise.com');
      // ou usando o equal é mais restritivo
      cy.url().should('eq', 'https://automationexercise.com/');

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

  it('Test Case 1: (Registrar usuário', () => {
    // Validar página de login
    cy.xpath('//a[@href="/login"]').click();
    cy.xpath("//div[@class='signup-form']/h2").should('be.visible');
    // ou conteúdo direto do texto: New User Signup!
    cy.xpath("//div[@class='signup-form']/h2").should('have.text', 'New User Signup!'); 
    
    cy.xpath("//*[@data-qa='signup-name']").type(loginUser);
    cy.xpath("//*[@data-qa='signup-email']").type(email);
    cy.xpath("//*[@data-qa='signup-button']").click();

    // Verificar o conteúdo direto do texto: 
    cy.xpath("//h2[contains(@class, 'title') and contains(@class, 'text-center')]/b").should('contain.text', 'Enter Account Information');
    cy.xpath("//input[@type='radio' and @value='Mrs']").check();
    cy.xpath("//*[@id='password']").type(password, { log: false });
    cy.xpath("//select[@data-qa='days']").select('23');
    cy.xpath("//select[@data-qa='months']").select('September');
    cy.xpath("//select[@data-qa='years']").select('1990');

    cy.xpath("//input[@type='checkbox' and @id='newsletter']").check();
    cy.xpath("//input[@type='checkbox' and @id='optin']").check();

    cy.xpath("//input[@id='first_name']").type(primeiroNomeEndereco);
    cy.xpath("//input[@id='last_name']").type(ultimoNomeEndereco);
    cy.xpath("//input[@id='company']").type(empresa);
    cy.xpath("//input[@id='address1']").type(endereco);
    cy.xpath("//input[@id='address2']").type(endereco2);
    cy.xpath("//select[@id='country']").select(pais);
    cy.xpath("//input[@id='state']").type(estado);
    cy.xpath("//input[@id='city']").type(cidade);
    cy.xpath("//*[@data-qa='zipcode']").type(cep);
    cy.xpath("//*[@data-qa='mobile_number']").type(cel);
    cy.xpath("//*[@data-qa='create-account']").click();

    cy.url().should('eq', 'https://automationexercise.com/account_created');
    cy.xpath("//*[@data-qa='account-created']").should('have.text', 'Account Created!');

    cy.xpath("//*[@data-qa='continue-button']").click();
    // Valida que o nome de usuário aparece em negrito (<b>) na área de "Logged in as"
    cy.xpath(`//b[text()='${loginUser}']`).should('have.text', loginUser);

  });

  it("Test Case 2: Login de usuário com email e senha válidos", () => {
    cy.visit(uri);
    cy.xpath("//*[contains(@class, 'logo')]").should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.xpath('//a[@href="/login"]').click();
    cy.xpath("//div[@class='login-form']/h2").should('have.text', 'Login to your account');

    cy.xpath('//input[@data-qa="login-email"]').type(email);
    cy.xpath('//input[@data-qa="login-password"]').type(password, { log: true });
    cy.xpath('//button[@data-qa="login-button"]').click();

    cy.contains('b', loginUser).should('have.text', loginUser);
  });

  it("Test Case 3: Login de usuário com email e senha inválidos", () => {
    cy.visit(uri);
    cy.xpath("//*[contains(@class, 'logo')]").should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.xpath("//a[@href='/login']").click();
    cy.xpath("//div[@class='login-form']/h2").should('have.text', 'Login to your account');

    cy.xpath("//input[@data-qa='login-email']").type(`${email}.br`);
    cy.xpath("//input[@data-qa='login-password']").type(`${password} `, { log: true });
    cy.xpath("//button[@data-qa='login-button']").click();
    cy.xpath("//form[@action='/login']/p").should('have.text', 'Your email or password is incorrect!');
  });

  it("Test Case 4: Logout de usuário", () => {
    cy.visit(uri);
    cy.xpath("//*[contains(@class, 'logo')]").should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.xpath("//a[@href='/login']").click();
    cy.xpath("//div[@class='login-form']/h2").should('have.text', 'Login to your account');

    cy.xpath("//input[@data-qa='login-email']").type(email);
    cy.xpath("//input[@data-qa='login-password']").type(password, { log: true });
    cy.xpath("//button[@data-qa='login-button']").click();

    cy.xpath(`//b[text()='Caso Teste 1']`).should('have.text', loginUser);
    cy.xpath("//a[@href='/logout']").click();
    cy.xpath("//h2[@class='or']").should('have.text', 'OR');

  });

  it("Test Case 5: Registrar usuário com email já cadastrado", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');
    
    cy.xpath("//a[@href='/login']").click();
    cy.xpath("//div[@class='login-form']/h2").should('have.text', 'Login to your account');

    cy.xpath("//div[@class='signup-form']/h2").should('have.text', 'New User Signup!');

    cy.xpath("//input[@data-qa='signup-name']").type(`loginUser - ${timestamp}}`);
    cy.xpath("//input[@data-qa='signup-email']").type(email);
    cy.xpath("//button[@data-qa='signup-button']").click();

    cy.xpath("//form[@action='/signup']/p").should('have.text', 'Email Address already exist!');

  });
});