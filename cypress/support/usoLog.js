import { fakerPT_BR as fakerPT_BR } from '@faker-js/faker';
import dataForm from '../fixtures/dadosExercicio-3.json';
import { navegarParaContato } from '../modules/contato';
import {
  getNumeroRandomico,
  getEmailRandomico,
  selecionarPaisAleatorio
} from '../support/helpers';

it("Exemplos de LOG com cy.log", () => {
    cy.log('STEP 1 :: PGATS AUTOMACAO WEB CY LOG')
    cy.log('STEP 2 :: PGATS AUTOMACAO WEB CY LOG')

    cy.log(`getNumeroRandomico: ${getNumeroRandomico()}`)
    cy.log(`getEmailRandomico: ${getEmailRandomico()}`)

    cy.log(`${ selecionarPaisAleatorio() }`)

    cy.log(`Nome do usuário: ${dataForm.name}`)
    cy.log(`Email do usuário: ${dataForm.email}`)

    cy.log(`Dog Breed: ${ fakerPT_BR.animal.dog() }`)
    cy.log(`Cat Breed: ${ fakerPT_BR.animal.cat() }`)
    cy.log(`FullName: ${ fakerPT_BR.person.fullName() }`)
    cy.log(`Company: ${ fakerPT_BR.company.name() }`)

    // cy.get('a[href*=contact]').click()
    navegarParaContato();

    const nomeDoArquivo = 'Lula_Ladrão.png';
    cy.fixture(nomeDoArquivo).as('imagem')
    cy.get('input[type=file]').selectFile('@imagem');

    cy.log(`STEP 3 :: PGATS AUTOMACAO WEB CY LOG ${ nomeDoArquivo }`)
  });