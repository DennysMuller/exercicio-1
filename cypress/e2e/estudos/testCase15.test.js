it.only("Test case 15: Fazer pedido: Registrar antes de finalizar a compra", () => {
    cy.visit(uri);
    cy.get('.logo').should('be.visible');
    cy.url().should('eq', 'https://automationexercise.com/');

    // Se inscrever no site, passos 4 até 7
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
    // Finaliza a inscrição

    // Adicionar os produtos, passo 8
    cy.get('a[data-product-id="1"]').first().click();
    cy.get('a[data-product-id="5"]').first().click({force: true});
    cy.get('a[data-product-id="2"]').first().click({force: true});
    cy.get('a[data-product-id="23"]').first().click({force: true});
    cy.get('.modal-title').should('have.text', 'Added!')

    // Ir para o carrinho e validar
    cy.get('a[href="/view_cart"]').first().click({force: true});
    cy.url().should('eq', 'https://automationexercise.com/view_cart');
    cy.get('.active').should('have.text', 'Shopping Cart');
    cy.get('.cart_product').should("have.length", 4);

    // Clicar em prosseguir
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
    // cy.get('a[href="/"][data-qa="continue-button"]').click();
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('have.text', 'Account Deleted!');
  });