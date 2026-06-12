# 💳 Sistema de Serviço de Pagamentos

Este é um projeto simples em JavaScript (Node.js) que implementa um serviço para realização de pagamentos, armazenamento de histórico e regras de negócio para categorização de valores. O projeto foi desenvolvido seguindo boas práticas de arquitetura de pastas e inclui testes automatizados.

## 📋 Funcionalidades

A classe `ServicoDePagamento` possui as seguintes regras e métodos:
*   **`pagar(codigoBarras, empresa, valor)`**: Registra um novo pagamento no sistema.
    *   Se o valor for **maior que 100.00**, o pagamento recebe automaticamente a categoria `'cara'`.
    *   Caso contrário (menor ou igual a 100.00), recebe a categoria `'padrão'`.
*   **`consultarUltimoPagamento()`**: Retorna o último pagamento que foi realizado no sistema (ou `null` caso nenhum tenha sido feito ainda).

---

## 📁 Estrutura do Projeto

```text
├── src/
│   └── ServicoDePagamento.js      # Código-fonte com a lógica da classe
├── test/
│   └── ServicoDePagamento.test.js # Testes automatizados unitários
├── package.json                   # Configurações do Node.js e dependências
└── README.md                      # Documentação do projeto
````

## 🚀 Tecnologias Utilizadas
Node.js (Ambiente de execução)

ES Modules (import / export nativos do JavaScript)

Mocha (Framework de Testes)

Node Assert (Módulo nativo do Node para asserções)

## 🛠️ Como Executar o Projeto Localmente
Pré-requisitos
Antes de começar, certifique-se de ter o Node.js instalado em sua máquina.

### Passo 1: Clonar o repositório
Abra o seu terminal e clone este repositório:

```bash
git clone [https://github.com/Daniloeng/pgats3](https://github.com/Daniloeng/pgats3)
cd pgats3/disciplina-programacao/sistema-pagamentos
````

### Passo 2: Inicializar e Instalar as dependências
Caso esteja configurando do zero ou após o clone, instale o Mocha (definido nas dependências de desenvolvimento):

```bash
npm install
````
### Passo 3: Executar os testes automatizados
Para rodar a suíte de testes com o Mocha, execute o comando abaixo:

```bash
npm test
```

Você verá um resultado no terminal semelhante a este:

```
Testes da Classe ServicoDePagamento
    ✓ Deve aplicar a categoria "cara" se o valor for maior que 100.00
    ✓ Deve aplicar a categoria "padrão" se o valor for menor ou igual a 100.00
    ✓ Deve retornar exatamente o ÚLTIMO pagamento realizado
    ✓ Deve retornar null se tentar consultar sem nenhum pagamento efetuado

  4 passing (10ms)
```