/*  
  Describe / Context - suíte ou conjunto de testes em um mesmo arquivo
  it - um teste dentro de um bloco ou conjunto de testes

  Describe -> Automation Exercise
    it -> Cadastrar um usuário
    it -> Teste abcde
  
  TAG           h1, div, button, input
  ID            #city  
  CLASSE        .form-control
  ATRIBUTO      [data-qa=city]

  Biblioteca de datas aleatórias para o select npm install dayjs

  npx cypress run, para o modo headless (executar sem interface gráfica)
*/
/// <reference types="cypress" />
describe('Automation Exercise', () => {
  it('Cadastrar um usuário', () => {
    // Gera um timestamp para garantir que o usuário seja único
    const uri = 'https://automationexercise.com/',
      timestamp = Date.now(),
      userName = `Teste PGATS 2-${timestamp}`,
      password = `1234abcd`,
      userEmail = `pgats2_${timestamp}@email.com`,
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


    cy.visit(uri);
    
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type(userName);
    cy.get('[data-qa="signup-email"]').type(userEmail);
    cy.get('[data-qa="signup-button"]').click();

    // Radio ou checkboxes -> check
    // cy.get('#id_gender1').check()
    cy.get('input[type=radio]').check('Mrs')
    cy.get('[id="password"]').type(password, { log: false });
    
    // Para comboboxes ou selects -> select
    cy.get('select[data-qa="days"]').select('23');
    cy.get('select[data-qa="months"]').select('September');
    cy.get('select[data-qa="years"]').select('1990')

    // Radio ou checkboxes -> check
    cy.get('input[type="checkbox"]#newsletter').check();
    cy.get('input[type="checkbox"]#optin').check();

    /*
    cy.get('input[data-qa="first_name"]').type(primeiroNomeEndereco);
    cy.get('input[data-qa="last_name"]').type(ultimoNomeEndereco);
    cy.get('input[data-qa="company"]').type(empresa)
    cy.get('input[data-qa="address"]').type(endereco)
    cy.get('input[data-qa="address2"]').type(endereco2)
    cy.get('select[data-qa=country]').select('Australia')
    cy.get('input[data-qa="state"]').type(estado)
    cy.get('input[data-qa="city"]').type(cidade)
    cy.get('input[data-qa="zipcode"]').type(cep)
    cy.get('input[data-qa="mobile_number"]').type(cel)
    */
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

    // Triplo A - Arrange, Act , Assert
    cy.url().should('include', 'account_created');
    cy.contains('b', 'Account Created!').should('be.visible');
    
  });
});