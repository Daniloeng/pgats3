# Cenários de Teste

Catálogo de todos os cenários automatizados. Os IDs aparecem no título de cada teste e no relatório Mochawesome, permitindo rastreabilidade.

**Legenda:** ✅ Cenário feliz · 🔀 Cenário alternativo

---

## UI (E2E)

### Cadastro — `cypress/e2e/ui/register.cy.js`

| ID        | Tipo | Cenário                                  | Pré-condição           | Resultado esperado                                                                                      |
| --------- | :--: | ---------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| CT-UI-001 |  ✅  | Cadastrar novo usuário e excluir a conta | —                      | "Account Created!" exibido, usuário logado ("Logged in as <nome>") e, após exclusão, "Account Deleted!" |
| CT-UI-002 |  🔀  | Cadastro com e-mail já existente         | Usuário criado via API | Mensagem "Email Address already exist!" e o formulário de dados da conta não é exibido                  |

### Login e Logout — `cypress/e2e/ui/login.cy.js`

| ID        | Tipo | Cenário                              | Pré-condição           | Resultado esperado                                                     |
| --------- | :--: | ------------------------------------ | ---------------------- | ---------------------------------------------------------------------- |
| CT-UI-003 |  ✅  | Login com credenciais válidas        | Usuário criado via API | "Logged in as <nome>" e link de Logout visíveis                        |
| CT-UI-004 |  ✅  | Logout                               | Usuário logado         | Redireciona para `/login`; link "Signup / Login" volta a aparecer      |
| CT-UI-005 |  🔀  | Login com senha incorreta            | Usuário criado via API | "Your email or password is incorrect!"; usuário não autenticado        |
| CT-UI-006 |  🔀  | Login com e-mail não cadastrado      | —                      | "Your email or password is incorrect!"; usuário não autenticado        |
| CT-UI-007 |  🔀  | Login com campos obrigatórios vazios | —                      | Validação HTML5 (`valueMissing`) impede o envio; permanece em `/login` |

### Produtos — `cypress/e2e/ui/products.cy.js`

| ID        | Tipo | Cenário                                    | Pré-condição | Resultado esperado                                                                                                   |
| --------- | :--: | ------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| CT-UI-008 |  ✅  | Listar produtos e exibir detalhes          | —            | Lista "All Products" com itens; detalhes do "Blue Top" com nome, preço, categoria, disponibilidade, condição e marca |
| CT-UI-009 |  ✅  | Buscar produto por termo existente ("Top") | —            | "Searched Products" com exatamente os mesmos produtos retornados pela API `/searchProduct`                           |
| CT-UI-010 |  🔀  | Buscar termo inexistente                   | —            | "Searched Products" sem nenhum produto listado                                                                       |

### Carrinho — `cypress/e2e/ui/cart.cy.js`

| ID        | Tipo | Cenário                                         | Pré-condição        | Resultado esperado                                       |
| --------- | :--: | ----------------------------------------------- | ------------------- | -------------------------------------------------------- |
| CT-UI-011 |  ✅  | Adicionar dois produtos ao carrinho             | —                   | 2 itens com nome, preço, quantidade (1) e total corretos |
| CT-UI-012 |  ✅  | Adicionar produto com quantidade 4 pelo detalhe | —                   | Quantidade 4 e total = preço unitário × 4                |
| CT-UI-013 |  🔀  | Remover o único produto do carrinho             | Produto no carrinho | Linha removida e mensagem "Cart is empty!"               |

### Checkout — `cypress/e2e/ui/checkout.cy.js`

| ID        | Tipo | Cenário                             | Pré-condição                                   | Resultado esperado                                                                      |
| --------- | :--: | ----------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| CT-UI-014 |  ✅  | Finalizar compra com usuário logado | Usuário criado via API e logado (`cy.session`) | Endereço de entrega com dados do usuário; após pagamento, "Order Placed!" e confirmação |
| CT-UI-015 |  🔀  | Checkout sem estar autenticado      | Produto no carrinho, sem login                 | Modal "Register / Login account to proceed on checkout."; link leva a `/login`          |

### Contact Us — `cypress/e2e/ui/contact.cy.js`

| ID        | Tipo | Cenário                               | Pré-condição | Resultado esperado                                                                                    |
| --------- | :--: | ------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| CT-UI-016 |  ✅  | Enviar formulário com anexo           | —            | Confirmação "Press OK to proceed!" aceita e "Success! Your details have been submitted successfully." |
| CT-UI-017 |  🔀  | Enviar com e-mail em formato inválido | —            | Validação HTML5 (`typeMismatch`) impede o envio; nenhuma mensagem de sucesso                          |

### Newsletter — `cypress/e2e/ui/subscription.cy.js`

| ID        | Tipo | Cenário                     | Pré-condição | Resultado esperado                                          |
| --------- | :--: | --------------------------- | ------------ | ----------------------------------------------------------- |
| CT-UI-018 |  ✅  | Assinar com e-mail válido   | —            | "You have been successfully subscribed!"                    |
| CT-UI-019 |  🔀  | Assinar com e-mail inválido | —            | Campo inválido (validação HTML5); sem mensagem de sucesso   |
| CT-UI-020 |  🔀  | Assinar com e-mail vazio    | —            | Campo obrigatório (`valueMissing`); sem mensagem de sucesso |

---

## API

Base URL: `https://automationexercise.com/api` · Referência: [API List](https://automationexercise.com/api_list)

> **Particularidade da API:** o status HTTP é sempre `200` e o código "real" vem no campo `responseCode` do body. O `Content-Type` é `text/html`, por isso o cliente (`support/api/automationExerciseApi.js`) converte o body com `JSON.parse`. Os testes validam ambos: `status` HTTP e `responseCode`.

### Produtos e Marcas — `cypress/e2e/api/products.api.cy.js`

| ID         | Endpoint (API List)      | Método | Parâmetros       | Resultado esperado                                                                               |
| ---------- | ------------------------ | :----: | ---------------- | ------------------------------------------------------------------------------------------------ |
| CT-API-001 | `/productsList` (API 1)  |  GET   | —                | `responseCode` 200; contrato `productsList.schema.json`; contém o produto "Blue Top"             |
| CT-API-002 | `/brandsList` (API 3)    |  GET   | —                | `responseCode` 200; contrato `brandsList.schema.json`; contém as marcas "Polo" e "H&M"           |
| CT-API-003 | `/searchProduct` (API 5) |  POST  | `search_product` | `responseCode` 200; contrato válido; todos os produtos relacionados ao termo (nome ou categoria) |

### Conta de usuário — `cypress/e2e/api/account.api.cy.js`

| ID         | Endpoint (API List)              | Método | Parâmetros                 | Resultado esperado                                                                       |
| ---------- | -------------------------------- | :----: | -------------------------- | ---------------------------------------------------------------------------------------- |
| CT-API-004 | `/createAccount` (API 11)        |  POST  | dados completos do usuário | `{ responseCode: 201, message: "User created!" }`                                        |
| CT-API-005 | `/verifyLogin` (API 7)           |  POST  | `email`, `password`        | `{ responseCode: 200, message: "User exists!" }`                                         |
| CT-API-006 | `/getUserDetailByEmail` (API 14) |  GET   | `email` (query string)     | `responseCode` 200; contrato `userDetail.schema.json`; dados iguais aos cadastrados      |
| CT-API-007 | `/updateAccount` (API 13)        |  PUT   | dados completos do usuário | `{ responseCode: 200, message: "User updated!" }` e dados alterados na consulta          |
| CT-API-008 | `/deleteAccount` (API 12)        | DELETE | `email`, `password`        | `{ responseCode: 200, message: "Account deleted!" }`; `verifyLogin` passa a retornar 404 |

---

## Gestão da massa de dados

- Todo usuário é gerado pela fábrica `buildUser()` com e-mail único (`qa.<timestamp>.<random>@test.com`).
- Testes que precisam de um usuário existente o criam via API em `beforeEach` e o removem em `afterEach`, mantendo o ambiente limpo e os testes independentes entre si.
- Dados estáveis do catálogo (produtos, preços, marcas) ficam em `cypress/fixtures/products.json`; mensagens esperadas em `cypress/fixtures/messages.json`.

## Como adicionar um cenário

1. Escolha o próximo ID livre (`CT-UI-0xx` ou `CT-API-0xx`).
2. Coloque-o no `context` correto (`Cenários felizes` / `Cenários alternativos`).
3. Registre-o na tabela correspondente deste documento.
