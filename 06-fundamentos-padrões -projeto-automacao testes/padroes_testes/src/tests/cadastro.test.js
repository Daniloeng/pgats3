// tests/cadastro.test.js
// Cada teste cria seu próprio repositório: dados isolados, sem dependência
// entre cenários e sem estado global compartilhado.
const CadastroPage = require("../pages/CadastroPage");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const UsuarioBuilder = require("../builders/UsuarioBuilder");
const { assert, executarSuite } = require("../utils/testRunner");

async function testeCadastroComSucesso() {
  const repositorio = new UsuarioRepository();
  const cadastroPage = new CadastroPage(repositorio);
  const usuario = new UsuarioBuilder()
    .comNome("João da Silva")
    .comEmail("joao@email.com")
    .comSenha("Senha@123")
    .build();

  const resultado = await cadastroPage.cadastrar(usuario);

  assert(resultado.status === 201, "Esperava status 201 no cadastro válido");
}

async function testeCadastroInvalidoSemEmail() {
  const repositorio = new UsuarioRepository();
  const cadastroPage = new CadastroPage(repositorio);
  const usuario = new UsuarioBuilder().comNome("Usuário Sem Email").semEmail().build();

  const resultado = await cadastroPage.cadastrar(usuario);

  assert(resultado.status === 400, "Esperava status 400 para campo obrigatório ausente");
  assert(
    resultado.mensagem === "Todos os campos de cadastro são obrigatórios",
    "Mensagem de validação incorreta"
  );
}

async function executar() {
  await executarSuite("Cadastro", {
    "Cadastro com sucesso": testeCadastroComSucesso,
    "Cadastro inválido (sem e-mail)": testeCadastroInvalidoSemEmail,
  });
}

module.exports = { executar };
