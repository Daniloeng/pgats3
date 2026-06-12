# 🔐 Desafio: Sistema de Validação de Login

Este projeto foi desenvolvido como parte das atividades práticas da disciplina de **Algoritmos e Lógica de Programação** da Pós-Graduação em Automação de Testes de Software (PGATS).

O objetivo é criar uma função em JavaScript que simule o processo de login de um site, validando regras de correspondência de credenciais e contas expiradas.

## 📋 Regras de Negócio do Desafio

A função `fazerLogin(email, senha)` valida as seguintes condições:
1. **Sucesso:** Retorna `'Login realizado com sucesso'` se o e-mail e a senha estiverem corretos.
2. **Credenciais Expiradas:** Retorna `'Renove suas credenciais'` se o usuário for encontrado, mas a propriedade `expirado` for `true`.
3. **Usuário Não Encontrado:** Retorna `'As credenciais estão incorretas'` se o e-mail não existir na base de dados.
4. **Senha Incorreta:** Retorna `'As credenciais estão incorretas'` se a senha não bater com a do e-mail digitado.

---

## 📁 Estrutura de Pastas

```text
├── src/
│   └── SistemaLogin.js      # Base de dados de usuários e função fazerLogin
├── test/
│   └── SistemaLogin.test.js # Cobertura dos 4 cenários de teste requisitados
├── package.json             # Configuração do ambiente e scripts
└── README.md                # Documentação do desafio
```

## 🚀 Como Executar Localmente
Pré-requisitos
Ter o Node.js instalado.

### Passo 1: Instalar dependências
No terminal, dentro da pasta deste projeto, instale o framework de testes (Mocha):

```bash
npm install
```
### Passo 2: Executar a suíte de testes
Rode o comando abaixo para validar os 4 cenários exigidos pelo desafio:

```bash
npm test
```

### Você verá um resultado no terminal semelhante a este:

```
  Testes do Sistema de Login (Desafio)
    ✔ Deve retornar sucesso ao informar e-mail e senha corretos
    ✔ Deve alertar para renovação caso a credencial esteja expirada
    ✔ Deve informar que as credenciais estão incorretas se o usuário não for encontrado
    ✔ Deve informar que as credenciais estão incorretas se a senha estiver errada

  4 passing (ms)
```

## 🛠️ Tecnologias
* JavaScript (ES6 / ES Modules)
* Node.js
* Mocha (Test Runner)
* Node Assert (Módulo de asserções nativo)
