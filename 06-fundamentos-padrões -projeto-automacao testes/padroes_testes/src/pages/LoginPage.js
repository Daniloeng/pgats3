// pages/LoginPage.js
// Page Object da tela de login. Consulta o repositório injetado em vez de
// depender de uma variável global compartilhada com a tela de cadastro.
const { esperar } = require("../utils/wait");
const { URL_SISTEMA } = require("../config/config");

class LoginPage {
  constructor(usuarioRepository) {
    this.url = `${URL_SISTEMA}/login`;
    this.usuarioRepository = usuarioRepository;
  }

  async logar(email, senha) {
    console.log(`   [UI] Carregando tela de login: ${this.url}`);
    await esperar(200);

    console.log(`   [UI] Preenchendo credenciais para: ${email}`);
    await esperar(200);

    console.log("   [UI] Clicando no botão de entrar...");
    await esperar(200);

    const usuario = this.usuarioRepository.buscarPorCredenciais(email, senha);

    if (usuario) {
      return { status: 200, token: "token_seguro_123" };
    }

    return { status: 401, erro: "Credenciais inválidas" };
  }
}

module.exports = LoginPage;
