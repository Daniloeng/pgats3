// tests/login.test.js
const CadastroPage = require("../pages/CadastroPage");
const LoginPage = require("../pages/LoginPage");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const UsuarioBuilder = require("../builders/UsuarioBuilder");
const { assert, executarSuite } = require("../utils/testRunner");

async function testeLoginComSucesso() {
  // Repositório e usuário próprios deste teste: nada de credencial hardcoded
  // "mágica" compartilhada entre testes.
  const repositorio = new UsuarioRepository();
  const cadastroPage = new CadastroPage(repositorio);
  const loginPage = new LoginPage(repositorio);

  const usuario = new UsuarioBuilder()
    .comNome("Maria Souza")
    .comEmail("maria@email.com")
    .comSenha("SenhaForte@1")
    .build();

  await cadastroPage.cadastrar(usuario);
  const resultado = await loginPage.logar(usuario.email, usuario.senha);

  assert(resultado.status === 200, "Esperava status 200 no login válido");
  assert(!!resultado.token, "Esperava um token de autenticação");
}

async function testeLoginComFalha() {
  const repositorio = new UsuarioRepository();
  const loginPage = new LoginPage(repositorio);

  const resultado = await loginPage.logar("errado@email.com", "senha_incorreta");

  assert(resultado.status === 401, "Esperava status 401 para credenciais inválidas");
  assert(resultado.erro === "Credenciais inválidas", "Mensagem de erro incorreta");
}

async function executar() {
  await executarSuite("Login", {
    "Login com sucesso": testeLoginComSucesso,
    "Login com falha (credenciais inválidas)": testeLoginComFalha,
  });
}

module.exports = { executar };
