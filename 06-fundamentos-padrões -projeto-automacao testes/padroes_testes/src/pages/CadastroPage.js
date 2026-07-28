// pages/CadastroPage.js
// Page Object: encapsula apenas a interação com a tela de cadastro.
// Não conhece regras de outras telas nem guarda estado global.
const { esperar } = require("../utils/wait");
const { URL_SISTEMA } = require("../config/config");

class CadastroPage {
  constructor(usuarioRepository) {
    this.url = `${URL_SISTEMA}/cadastro`;
    this.usuarioRepository = usuarioRepository;
  }

  async cadastrar({ nome, email, senha }) {
    console.log(`   [UI] Carregando tela de cadastro: ${this.url}`);
    await esperar(200);

    if (!nome || !email || !senha) {
      console.log("   [UI] Erro: campos em branco detectados na tela!");
      return { status: 400, mensagem: "Todos os campos de cadastro são obrigatórios" };
    }

    console.log(`   [UI] Preenchendo formulário de cadastro para: ${email}`);
    await esperar(200);

    console.log("   [UI] Clicando no botão de cadastrar...");
    await esperar(200);

    this.usuarioRepository.salvar({ nome, email, senha });

    return { status: 201, id: this.usuarioRepository.total() };
  }
}

module.exports = CadastroPage;
