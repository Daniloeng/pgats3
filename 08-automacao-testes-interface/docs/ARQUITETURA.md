# Arquitetura e Boas Práticas

Este documento explica **como** o projeto está organizado e **por que** cada decisão foi tomada.

## Visão geral das camadas

```
┌─────────────────────────────────────────────────────────────┐
│ Specs (cypress/e2e)          → O QUE testar (intenção)     │
├─────────────────────────────────────────────────────────────┤
│ Page Objects / Components    → COMO interagir com a UI      │
│ API Client                   → COMO falar com a API         │
│ Factories / Fixtures         → COM QUAIS dados              │
│ Custom Commands              → Utilitários reutilizáveis    │
└─────────────────────────────────────────────────────────────┘
```

Os specs descrevem o comportamento esperado; nenhum seletor CSS ou URL de endpoint aparece neles. Se a UI mudar, a correção acontece em um único Page Object.

## Page Objects

Cada página é um objeto com:

- `elements` — funções que retornam a chain Cypress do elemento (`() => cy.get(...)`). Usar funções, e não elementos guardados, mantém o **retry automático** do Cypress e evita referências a elementos "velhos" (_detached_);
- **ações** de negócio (`login`, `addProductToCart`, `placeOrder`), que agrupam interações de baixo nível.

As **asserções ficam nos specs**, exceto verificações de sincronização dentro de ações (ex.: aguardar o modal do carrinho aparecer antes de seguir).

Elementos presentes em várias páginas (menu e rodapé) ficam em `support/components` (`Header`, `Footer`).

## Estratégia de seletores

Ordem de prioridade adotada:

1. `data-qa` — atributo criado para testes (ex.: `[data-qa="login-email"]`);
2. `id` estáveis (ex.: `#search_product`, `#cart_info_table`);
3. `href` de navegação (ex.: `a[href="/products"]`);
4. `cy.contains(seletor, texto)` para textos visíveis ao usuário.

Evitamos seletores baseados em posição (`:nth-child`) ou classes de estilo.

## Cliente de API

`support/api/automationExerciseApi.js` centraliza os endpoints e normaliza as respostas:

- Envio em **form-data** (`form: true`) para POST/PUT/DELETE, como a API exige;
- `failOnStatusCode: false` para que o próprio teste faça as asserções;
- Conversão do body (`text/html`) para JSON;
- Retorno padronizado `{ status, headers, duration, body }`.

O mesmo cliente é usado nos testes de UI para **preparar e limpar dados** — muito mais rápido e confiável que fazer isso pela interface.

## Testes de contrato

Os JSON Schemas em `cypress/fixtures/schemas` descrevem a estrutura esperada das respostas. O comando `cy.validateSchema(schema)` usa o **Ajv** e, em caso de falha, exibe no relatório quais campos violaram o contrato.

## Massa de dados

- **Dinâmica** (`support/factories/userFactory.js`): usuários e cartões gerados com Faker; e-mail único por execução, eliminando conflitos entre execuções paralelas ou repetidas.
- **Estática** (`fixtures/*.json`): dados do catálogo e mensagens esperadas, evitando _strings_ mágicas espalhadas pelos specs.

## Independência e isolamento

- `testIsolation: true`: cada teste começa com cookies, localStorage e sessionStorage limpos.
- Cada teste cria a sua própria pré-condição e a remove ao final (`beforeEach`/`afterEach`), podendo rodar sozinho ou em qualquer ordem.
- Limpeza é **idempotente**: excluir uma conta já excluída não gera falha.

## Login com `cy.session`

O comando `cy.loginViaUi(email, senha)` executa o login uma vez e guarda cookies em cache. A função `validate` confirma, via `cy.request`, que a sessão restaurada continua autenticada; caso contrário o login é refeito.

## Estabilidade (anti-flakiness)

| Medida                                          | Onde                                                           |
| ----------------------------------------------- | -------------------------------------------------------------- |
| Sem `cy.wait(ms)`; somente asserções com retry  | Todo o projeto (regra ESLint `cypress/no-unnecessary-waiting`) |
| Bloqueio de domínios de anúncios (`blockHosts`) | `cypress.config.js`                                            |
| Ignorar apenas exceções de scripts de terceiros | `support/e2e.js`                                               |
| `retries.runMode: 2`                            | `cypress.config.js`                                            |
| Timeouts ajustados para site público            | `cypress.config.js`                                            |

## Segurança

- Senhas e dados de cartão são digitados com `cy.typeSensitive()` (`log: false`), não aparecendo no Command Log nem nos screenshots do log.
- Nenhuma credencial fixa no repositório; `cypress.env.json` e `.env` estão no `.gitignore`.
- O cartão usado é o número público de teste `4111 1111 1111 1111`.

## Relatório

O `cypress-mochawesome-reporter` é registrado em dois pontos:

- `cypress.config.js` → `reporter`, `reporterOptions` e o plugin em `setupNodeEvents`;
- `cypress/support/e2e.js` → `import 'cypress-mochawesome-reporter/register'`.

Com `embeddedScreenshots` e `inlineAssets`, o resultado é um único `cypress/reports/index.html`, fácil de anexar ou publicar como artifact.

## Qualidade de código

- **ESLint** (`eslint.config.mjs`) com as regras recomendadas do `eslint-plugin-cypress`;
- **Prettier** (`.prettierrc.json`) para formatação consistente;
- **EditorConfig** para padronizar editores;
- O job de lint roda **antes** dos testes no CI — código fora do padrão não chega a executar a suíte.
