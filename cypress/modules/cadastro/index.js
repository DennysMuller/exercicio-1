import { fakerPT_BR as fakerPT_BR} from "@faker-js/faker";
import {
  selecionarPaisAleatorio
} from '../../support/helpers';
import { password } from '../../modules/login';

class Cadastro {
  prencherFormularioDeCadastroCompleto(){
    // Verificar o conteúdo direto do texto: 
    cy.get('h2.title.text-center b').should('contain.text', 'Enter Account Information')
    cy.get('input[type=radio]').check('Mrs')
    cy.get('[id="password"]').type(password, { log: false });

    // Para comboboxes ou selects -> select
    cy.get('select[data-qa="days"]').select('23');
    cy.get('select[data-qa="months"]').select('September');
    cy.get('select[data-qa="years"]').select('1990');

    // Para radio ou checkboxes -> check
    cy.get('input[type="checkbox"]#newsletter').check();
    cy.get('input[type="checkbox"]#optin').check();

    cy.get('input#first_name').type(fakerPT_BR.person.firstName());
    cy.get('input#last_name').type(fakerPT_BR.person.lastName());
    cy.get('input#company').type(fakerPT_BR.company.name());
    cy.get('input#address1').type(fakerPT_BR.location.streetAddress());
    cy.get('input#address2').type(fakerPT_BR.location.streetAddress());
    cy.get('select#country').select(selecionarPaisAleatorio(), { force: true });
    cy.get('input#state').type(fakerPT_BR.location.state());
    cy.get('input#city').type(fakerPT_BR.location.city());
    cy.get('[data-qa="zipcode"]').type(fakerPT_BR.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type(fakerPT_BR.phone.number());

    // Act
    cy.get('[data-qa="create-account"]').click();
  }
}

export default new Cadastro();