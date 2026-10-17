# Automation Exercise — Testes E2E e de API com Cypress

[![Cypress Tests](https://github.com/<seu-usuario>/automationexercise-cypress/actions/workflows/cypress.yml/badge.svg)](https://github.com/<seu-usuario>/automationexercise-cypress/actions/workflows/cypress.yml)

Projeto de automação de testes para o site de prática [Automation Exercise](https://www.automationexercise.com), cobrindo:

- **UI (E2E)** — cenários felizes e alternativos dos principais fluxos do e-commerce;
- **API** — cenários felizes dos endpoints publicados em [API List](https://automationexercise.com/api_list), com validação de contrato (JSON Schema);
- **Relatório** HTML com [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter);
- **CI** no GitHub Actions executado a cada `push`.

> Detalhamento de todos os cenários: [`docs/CENARIOS.md`](docs/CENARIOS.md) · Arquitetura e boas práticas: [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)

---

## Sumário

- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Relatório Mochawesome](#relatório-mochawesome)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Cobertura de testes](#cobertura-de-testes)
- [Pipeline CI (GitHub Actions)](#pipeline-ci-github-actions)
- [Configuração](#configuração)
- [Padrões de código](#padrões-de-código)
- [Contribuindo](#contribuindo)

## Stack

| Ferramenta                                                                                                   | Uso                                  |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| [Cypress 16](https://www.cypress.io/)                                                                        | Framework de testes E2E e API        |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)                      | Relatório HTML com gráficos e prints |
| [@faker-js/faker](https://fakerjs.dev/)                                                                      | Geração de massa de dados dinâmica   |
| [Ajv](https://ajv.js.org/)                                                                                   | Validação de contrato (JSON Schema)  |
| [ESLint](https://eslint.org/) + [eslint-plugin-cypress](https://github.com/cypress-io/eslint-plugin-cypress) | Análise estática                     |
| [Prettier](https://prettier.io/)                                                                             | Formatação de código                 |
| [GitHub Actions](https://docs.github.com/actions)                                                            | Integração contínua                  |

## Pré-requisitos

- [Node.js](https://nodejs.org/) **20 ou superior** (versão de referência em `.nvmrc`: 22)
- npm 10+
- Google Chrome (opcional — o Cypress já inclui o Electron)

## Instalação

```bash
git clone https://github.com/<seu-usuario>/automationexercise-cypress.git
cd automationexercise-cypress
npm install
```

## Execução

| Comando                | Descrição                                                |
| ---------------------- | -------------------------------------------------------- |
| `npm run cy:open`      | Abre o Cypress em modo interativo                        |
| `npm test`             | Executa **todos** os testes em modo headless + relatório |
| `npm run test:ui`      | Executa apenas os testes de UI                           |
| `npm run test:api`     | Executa apenas os testes de API                          |
| `npm run test:chrome`  | Executa todos os testes no Chrome                        |
| `npm run test:headed`  | Executa com o navegador visível                          |
| `npm run lint`         | Analisa o código com ESLint                              |
| `npm run format`       | Formata o código com Prettier                            |
| `npm run report:clean` | Remove relatórios, screenshots e vídeos anteriores       |

Executar uma spec específica:

```bash
npx cypress run --spec cypress/e2e/ui/login.cy.js
```

## Relatório Mochawesome

Após `npm test`, o relatório é gerado em:

```
cypress/reports/index.html
```

O relatório inclui gráficos de resultado, duração de cada teste e **screenshots embutidos** dos testes que falharam (`embeddedScreenshots` + `inlineAssets`, gerando um único arquivo HTML portátil). No CI ele é publicado como _artifact_ da execução.

## Estrutura do projeto

```
automationexercise-cypress/
├── .github/workflows/cypress.yml     # Pipeline CI (lint + testes UI/API em paralelo)
├── cypress/
│   ├── e2e/
│   │   ├── api/                      # Testes de API
│   │   │   ├── account.api.cy.js
│   │   │   └── products.api.cy.js
│   │   └── ui/                       # Testes de UI (E2E)
│   │       ├── cart.cy.js
│   │       ├── checkout.cy.js
│   │       ├── contact.cy.js
│   │       ├── login.cy.js
│   │       ├── products.cy.js
│   │       ├── register.cy.js
│   │       └── subscription.cy.js
│   ├── fixtures/
│   │   ├── schemas/                  # JSON Schemas para testes de contrato
│   │   ├── messages.json             # Mensagens esperadas da aplicação
│   │   ├── products.json             # Massa estática de produtos
│   │   └── upload-sample.txt         # Arquivo de upload do Contact Us
│   └── support/
│       ├── api/                      # Cliente da API (camada de serviço)
│       ├── components/               # Componentes compartilhados (Header, Footer)
│       ├── factories/                # Fábricas de dados com Faker
│       ├── pages/                    # Page Objects
│       ├── commands.js               # Custom commands
│       └── e2e.js                    # Setup global (reporter, handlers)
├── docs/
│   ├── ARQUITETURA.md
│   └── CENARIOS.md
├── cypress.config.js
├── eslint.config.mjs
└── package.json
```

## Cobertura de testes

| Suíte     | Funcionalidade    | Felizes | Alternativos |
| --------- | ----------------- | :-----: | :----------: |
| UI        | Cadastro          |    1    |      1       |
| UI        | Login / Logout    |    2    |      3       |
| UI        | Produtos / Busca  |    2    |      1       |
| UI        | Carrinho          |    2    |      1       |
| UI        | Checkout          |    1    |      1       |
| UI        | Contact Us        |    1    |      1       |
| UI        | Newsletter        |    1    |      2       |
| API       | Produtos e Marcas |    3    |      —       |
| API       | Conta de usuário  |    5    |      —       |
| **Total** |                   | **18**  |    **10**    |

Lista completa, com pré-condições e resultados esperados, em [`docs/CENARIOS.md`](docs/CENARIOS.md).

## Pipeline CI (GitHub Actions)

O workflow [`.github/workflows/cypress.yml`](.github/workflows/cypress.yml) é disparado:

- a cada **`push`** em qualquer branch;
- em **pull requests** para `main`;
- manualmente (**workflow_dispatch**), pela aba _Actions_.

Etapas:

1. **Lint** — `npm ci`, ESLint e verificação do Prettier;
2. **Cypress** — executado após o lint, em _matrix_ paralela (`ui` e `api`) no Chrome, usando a action oficial `cypress-io/github-action` (com cache de dependências e do binário);
3. **Artifacts** — o relatório Mochawesome de cada suíte é publicado sempre (`if: always()`); screenshots apenas em caso de falha.

Execuções antigas do mesmo branch são canceladas automaticamente (`concurrency`).

Para ver o relatório: _Actions_ → execução desejada → seção **Artifacts** → `mochawesome-report-ui` / `mochawesome-report-api`.

## Configuração

Principais opções em `cypress.config.js`:

| Opção           | Valor                                | Motivo                                       |
| --------------- | ------------------------------------ | -------------------------------------------- |
| `baseUrl`       | `https://www.automationexercise.com` | URLs relativas em `cy.visit()`               |
| `env.apiUrl`    | `https://automationexercise.com/api` | Base dos testes de API                       |
| `retries`       | `runMode: 2`, `openMode: 0`          | Mitiga instabilidade do site público no CI   |
| `blockHosts`    | domínios de anúncios/analytics       | Evita popups de anúncio e acelera os testes  |
| `video`         | `false`                              | Execução mais rápida; screenshots em falhas  |
| `testIsolation` | `true`                               | Cada teste começa com cookies/storage limpos |

Sobrescrever variáveis sem alterar o código:

```bash
npx cypress run --config baseUrl=https://www.automationexercise.com/ --env apiUrl=https://www.automationexercise.com/api_list
```

Ou via variáveis de ambiente (`CYPRESS_baseUrl`, `CYPRESS_apiUrl`) ou um arquivo local `cypress.env.json` (ignorado pelo Git).

## Padrões de código

- **Page Objects** em `support/pages` e componentes compartilhados em `support/components`; os specs não contêm seletores.
- Seletores priorizando atributos estáveis (`data-qa`, `id`) — ver [ARQUITETURA.md](docs/ARQUITETURA.md#estratégia-de-seletores).
- **Massa de dados dinâmica** (Faker) e e-mails únicos por execução.
- **Pré-condições via API** (criação de usuário) e **limpeza via API** em `afterEach`.
- **`cy.session`** para reaproveitar o login.
- Sem `cy.wait(<ms>)`: apenas asserções com retry automático.
- Dados sensíveis (senha, cartão) digitados com `log: false`.
- Nomenclatura de testes com ID rastreável: `CT-UI-001`, `CT-API-001`.
- Commits recomendados no padrão [Conventional Commits](https://www.conventionalcommits.org/).

## Contribuindo

1. Crie um branch: `git checkout -b feat/novo-cenario`
2. Implemente o teste seguindo os padrões acima e registre-o em `docs/CENARIOS.md`
3. Rode `npm run lint` e `npm run format`
4. Faça o commit e abra um Pull Request — o pipeline será executado automaticamente
