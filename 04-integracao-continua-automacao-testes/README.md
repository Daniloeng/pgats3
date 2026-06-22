# 📌 Pipeline de Integração Contínua com GitHub Actions

## 📖 Descrição do Projeto

Este projeto implementa uma pipeline de Integração Contínua (CI) utilizando GitHub Actions, com o objetivo de automatizar a execução de testes em dois sistemas diferentes:

* Sistema de Login
* Sistema de Pagamentos

A pipeline garante execução automática dos testes, geração de relatórios e armazenamento dos resultados como artefatos no GitHub.

---

## ⚙️ Tecnologias Utilizadas

* Node.js
* Mocha (framework de testes)
* mocha-junit-reporter (geração de relatórios XML)
* GitHub Actions (CI/CD)

---

## 📁 Estrutura do Projeto

```text
03-programacao-para-automacao/
├── sistema-login/
│   ├── src/
│   ├── test/
│   ├── reports/
│   └── package.json
│
├── sistema-pagamentos/
│   ├── src/
│   ├── test/
│   ├── reports/
│   └── package.json
```

---

## 🚀 Pipeline de Integração Contínua

A pipeline é executada automaticamente nos seguintes cenários:

* Push para as branches `main` e `master`
* Execução manual via `workflow_dispatch`
* Execução agendada via `schedule`

---

## 🔄 Fluxo da Pipeline

1. Checkout do código
2. Configuração do Node.js
3. Instalação de dependências do sistema de login
4. Execução dos testes do sistema de login
5. Instalação de dependências do sistema de pagamentos
6. Execução dos testes do sistema de pagamentos
7. Geração de relatórios de testes
8. Upload dos relatórios como artefatos

---

## 📊 Relatórios de Testes

Os testes geram relatórios no formato:

* XML (mocha-junit-reporter)

Os relatórios são armazenados na pasta:

```text
reports/results.xml
```

---

## 📦 Artefatos

Após cada execução da pipeline, os relatórios são disponibilizados na aba:

👉 GitHub Actions → Run → Artifacts

Nome do artefato:

```text
relatorio-testes
```

---

## ▶️ Como Executar Localmente

```bash
cd 03-programacao-para-automacao/sistema-login
npm install
npm test
```

```bash
cd ../sistema-pagamentos
npm install
npm test
```

---

## 🧠 Conceitos Aplicados

* Integração Contínua (CI)
* Automação de testes
* Pipelines no GitHub Actions
* Execução em múltiplos ambientes (monorepo)
* Geração e armazenamento de relatórios
