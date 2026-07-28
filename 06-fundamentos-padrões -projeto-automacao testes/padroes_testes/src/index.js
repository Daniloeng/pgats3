// index.js
// Ponto de entrada único, apenas orquestra as suítes de teste.
// Em um projeto real, este papel seria do próprio test runner (Jest/Mocha/CI).
const cadastroTests = require("./tests/cadastro.test");
const loginTests = require("./tests/login.test");

async function main() {
  await cadastroTests.executar();
  await loginTests.executar();
}

main();
