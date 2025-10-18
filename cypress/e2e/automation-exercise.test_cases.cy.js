/// <reference types="cypress" />
import dataForm from '../fixtures/dadosExercicio-3.json';

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
            failOnStatusCode: true,
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

  it("Test case 6: Formulário de contato", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/contact_us"]').click();

    cy.get('div.contact-form > .title').should('have.text', 'Get In Touch');

    cy.get('[data-qa="name"]').type(dataForm.name);
    cy.get('[data-qa="email"]').type(dataForm.email);
    cy.get('[data-qa="subject"]').type(dataForm.subject);
    cy.get('[data-qa="message"]').type(dataForm.message);

    cy.fixture('Lula_Ladrão.png').as('arquivo');
    cy.get('input[type=fiLe]').selectFile('@arquivo');

    cy.get('[data-qa="submit-button"]').click();

    // asserts
    cy.get('.status').should('be.visible');
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.');

    cy.get('#form-section > .btn').click();

    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');
  });

  it("Test case 8: Verificar todos os produtos e a página de detalhes do produto", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/products"]').click();
    cy.get('.title').should('have.text', 'All Products');
    cy.get('.col-sm-9').should("have.length", 1);
    cy.get('.col-sm-4').should("have.length", 35);

    cy.get('a[href="/product_details/1"').click();

    // Asserções
    cy.url().should('eq', 'https://automationexercise.com/product_details/1');
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information h2').should('have.text', 'Blue Top');
    cy.get('.product-information p').should('contain.text', 'Category: Women > Tops');
    cy.get('.product-information span').should('contain.text', 'Rs. 500');
    cy.get('.product-information p').should('contain.text', 'Availability: In Stock');
    cy.get('.product-information p').should('contain.text', 'Condition: New');
    cy.get('.product-information p').should('contain.text', 'Brand: Polo');
    // Ou todos
    cy.get('.product-information p').should('have.text', 'Category: Women > TopsAvailability: In StockCondition: NewBrand: Polo');
  });

  it("Test case 9: Procurar por produtos", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('a[href="/products"]').click();
    cy.get('.title').should('have.text', 'All Products');

    cy.get('input[id="search_product"]').type('tshirt');
    cy.get('button[id="submit_search"]').click();

    cy.url().should('eq', 'https://automationexercise.com/products?search=tshirt');
    cy.get('.title').should('have.text', 'Searched Products');
    cy.get('.product-image-wrapper').should("have.length", 6);
    
  });

  it("Test case 10: Verificar a subscrição (subscription) na página inicial", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    cy.get('.single-widget h2').should('have.text', 'Subscription');
    cy.get('input[id="susbscribe_email"]').type(email);
    cy.get('button[id="subscribe"]').click();
    cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!');

    // Uma solução mais certeira. 
    // should('be.visible') garante que o elemento esteja visível antes de prosseguir.
    // .and('have.text...') encadear outra asserção no mesmo elemento, verificando se
    // o texto corresponde ao esperado. O and() é apenas um alias para should(), mas 
    // melhora a legibilidade do código.
    cy.get('.alert-success').should('be.visible').and('have.text', 'You have been successfully subscribed!');

    // Deletar a conta incluída para testar o "teste 15"
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
    });
    //cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');

  });

  it("Test case 15: Fazer pedido: Registrar antes de finalizar a compra", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    // Adicionar os produtos, passo 8
    cy.get('a[data-product-id="1"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="5"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="2"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="29"]').eq(1).click({force: true});
    cy.get('.modal-title').should('have.text', 'Added!')

    // Ir para o carrinho e validar
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('.active').should('have.text', 'Shopping Cart');
    cy.get('.cart_product').should("have.length", 4);

    // Fazer o checkou
    cy.get('a.btn').click();
    cy.get('.modal-title').should('be.visible').and('have.text', 'Checkout');
    cy.get('a[href="/login"] u').click();

    // Se inscrever no site, passos 4 até 7
    cy.get('.signup-form h2').should('be.visible').and('have.text', 'New User Signup!');
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
    // Finaliza a inscrição

    // Ir para o carrinho e validar 
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('.active').should('have.text', 'Shopping Cart');
    cy.get('.cart_product').should("have.length", 4);

    // Fazer checkout
    cy.get('a.btn').click();

    // 12 Validar endereço e detalhes do pedido
    cy.get('h2.heading').first().should('have.text', 'Address Details');
    cy.get('.page-subheading').first().should('have.text', 'Your delivery address');
    cy.get('.address_firstname').first().should('have.text', 'Mrs. PGATS 2 - Primeiro Nome Endereço PGATS 2 - Ultimo Nome Endereço'); 

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(0).should('have.text', empresa);

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(1).should('have.text', endereco);

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(2).should('have.text', endereco2);

    // Validar cidade, estado e CEP usando 'contain' para ignorar quebras de linha, pois
    // o texto real do elemento contém uma quebra de linha (\n) e várias tabulações (\t) 
    // antes do CEP, a asserção falha.
    cy.get('#address_delivery .address_city.address_state_name.address_postcode')
      .should('contain', cidade)
      .and('contain', estado)
      .and('contain', cep);

    cy.get('#address_delivery .address_country_name').should('have.text', 'India'); 
    cy.get('#address_delivery .address_phone').should('have.text', '1+ 9123453456');

    // Detalhes
    cy.get('h2.heading').eq(1).should('have.text', 'Review Your Order');
    // Valida que existem 4 linhas de produto, ignorando a linha de total.
    // [] são usados para criar um Seletor de Atributo. permitem que você encontre elementos HTML
    // com base em seus atributos (como id, class, href, data-qa, etc.) e nos valores desses atributos.
    // ^ Quando usado dentro de um seletor de atributo atua como um modificador que significa "começa com". 
    // id^="product-" 
    // a condição do filtro é: o atributo id deve "começar com" a string 'product-'.
    cy.get('#cart_info tbody tr[id^="product-"]').should("have.length", 4);

    // Preencher formulário descritivo do pedido e fazer o pedido
    cy.get('.form-control').type(dataForm.body);
    cy.get('a[href="/payment"]').click();

    // Informar dados do cartão, clicar no botão Pagar e confirmar o pedido
    cy.get('h2.heading').should('have.text', 'Payment');
    cy.get('input[data-qa="name-on-card"]').type(loginUser);
    cy.get('input[data-qa="card-number"]').type(dataForm['card number']);
    cy.get('input[data-qa="cvc"]').type(dataForm.cvc);
    cy.get('input[data-qa="expiry-month"]').type(`${dataForm.mes}`);
    cy.get('input[data-qa="expiry-year"]').type(`${dataForm.ano}`);
    
    // Pedido efetuado com sucesso, a mensagem #success_message div tem quebra de linha e tabulações 
    // e não fica visível salvo se retornar a página
    cy.get('#success_message div').should('contain.text', 'Your order has been placed successfully!');
    cy.get('button[data-qa="pay-button"]').click();

    // Ajustado para a página de conclusão
    cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
    cy.get('#form p').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');

    // Deletar a conta incluída, PARA NÃO FAZER DUPLICAÇÃO DE CÓDIGO IREI COMENTAR A EXCLUSÃO DA CONTA
    // cy.get('a[href="/"][data-qa="continue-button"]').click();
    // cy.get('a[href="/delete_account"]').click();
    // cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
  });

  it("Test case 16: Fazer pedido: Login antes de finalizar a compra", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    // Adicionar os produtos, passo 8
    cy.get('a[data-product-id="15"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="5"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="23"]').eq(1).click({force: true});
    cy.get('button[data-dismiss="modal"]').click();
    cy.get('a[data-product-id="7"]').eq(1).click({force: true});
    cy.get('.modal-title').should('have.text', 'Added!')

    // Ir para o carrinho e validar
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('.active').should('have.text', 'Shopping Cart');
    cy.get('.cart_product').should("have.length", 4);

    // Fazer o checkout
    cy.get('a.btn').click();
    cy.get('.modal-title').should('be.visible').and('have.text', 'Checkout');
    cy.get('a[href="/login"] u').click();

    cy.get('.login-form h2').should('be.visible').and('have.text', 'Login to your account'); 
    
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(password, { log: true });
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('b', loginUser).should('be.visible').and('have.text', loginUser);

    // Ir para o carrinho e validar 
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('.active').should('have.text', 'Shopping Cart');
    cy.get('.cart_product').should("have.length", 4);

    // Fazer checkout
    cy.get('a.btn').click();

    // 12 Validar endereço e detalhes do pedido
    cy.get('h2.heading').first().should('have.text', 'Address Details');
    cy.get('.page-subheading').first().should('have.text', 'Your delivery address');
    cy.get('.address_firstname').first().should('have.text', 'Mrs. PGATS 2 - Primeiro Nome Endereço PGATS 2 - Ultimo Nome Endereço'); 

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(0).should('have.text', empresa);

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(1).should('have.text', endereco);

    cy.get('#address_delivery .address_address1.address_address2')
      .eq(2).should('have.text', endereco2);

    // Validar cidade, estado e CEP usando 'contain' para ignorar quebras de linha, pois
    // o texto real do elemento contém uma quebra de linha (\n) e várias tabulações (\t) 
    // antes do CEP, a asserção falha.
    cy.get('#address_delivery .address_city.address_state_name.address_postcode')
      .should('contain', cidade)
      .and('contain', estado)
      .and('contain', cep);

    cy.get('#address_delivery .address_country_name').should('have.text', 'India'); 
    cy.get('#address_delivery .address_phone').should('have.text', '1+ 9123453456');

    // Detalhes
    cy.get('h2.heading').eq(1).should('have.text', 'Review Your Order');
    // Valida que existem 4 linhas de produto, ignorando a linha de total.
    // [] são usados para criar um Seletor de Atributo. permitem que você encontre elementos HTML
    // com base em seus atributos (como id, class, href, data-qa, etc.) e nos valores desses atributos.
    // ^ Quando usado dentro de um seletor de atributo atua como um modificador que significa "começa com". 
    // id^="product-" 
    // a condição do filtro é: o atributo id deve "começar com" a string 'product-'.
    cy.get('#cart_info tbody tr[id^="product-"]').should("have.length", 4);

    // Preencher formulário descritivo do pedido e fazer o pedido
    cy.get('.form-control').type(dataForm.body);
    cy.get('a[href="/payment"]').click();

    // Informar dados do cartão, clicar no botão Pagar e confirmar o pedido
    cy.get('h2.heading').should('have.text', 'Payment');
    cy.get('input[data-qa="name-on-card"]').type(loginUser);
    cy.get('input[data-qa="card-number"]').type(dataForm['card number']);
    cy.get('input[data-qa="cvc"]').type(dataForm.cvc);
    cy.get('input[data-qa="expiry-month"]').type(`${dataForm.mes}`);
    cy.get('input[data-qa="expiry-year"]').type(`${dataForm.ano}`);
    
    // Pedido efetuado com sucesso, a mensagem #success_message div tem quebra de linha e tabulações 
    // e não fica visível salvo se retornar a página
    cy.get('#success_message div').should('contain.text', 'Your order has been placed successfully!');
    cy.get('button[data-qa="pay-button"]').click();

    // Ajustado para a página de conclusão
    cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
    cy.get('#form p').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');

    // Deletar a conta incluída
    //cy.get('a[href="/"][data-qa="continue-button"]').click();
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
  });
});