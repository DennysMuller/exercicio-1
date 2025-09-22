# Projeto de Automação de Testes com Cypress

Este projeto contém um teste automatizado para o site [Automation Exercise](https://automationexercise.com/), focado no cadastro de um novo usuário.

## 📝 Descrição

O teste automatizado executa os seguintes passos:
1. Acessa a página inicial do Automation Exercise.
2. Navega para a página de login/cadastro.
3. Preenche o formulário de cadastro com dados gerados dinamicamente (nome e e-mail).
4. Preenche os detalhes da conta e informações de endereço.
5. Submete o formulário.
6. Verifica se a conta foi criada com sucesso.

## 🛠️ Tecnologias Utilizadas

*   [Node.js](https://nodejs.org/)
*   [Cypress](https://www.cypress.io/)

## ⚙️ Configuração do Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd exercicio-1
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

## 🚀 Executando os Testes

### Em modo interativo (com interface gráfica)

1.  **Abra o Cypress:**
    ```bash
    npx cypress open
    ```
2.  Na interface do Cypress, selecione o teste `automation-exercise.cy.js` para executá-lo.

### Em modo headless (sem interface gráfica)

*   **Execute o seguinte comando no terminal:**
    ```bash
    npx cypress run
    ```
