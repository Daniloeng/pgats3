// builders/UsuarioBuilder.js
// Padrão Builder: permite construir objetos de usuário de forma incremental e
// expressiva (method chaining), com valores padrão seguros, evitando massa de
// dados hardcoded e duplicada espalhada pelos testes.
class UsuarioBuilder {
  constructor() {
    this.nome = "Usuário Padrão";
    this.email = "usuario.padrao@sistema.com";
    this.senha = "SenhaSegura123!";
  }

  comNome(nome) {
    this.nome = nome;
    return this;
  }

  comEmail(email) {
    this.email = email;
    return this;
  }

  comSenha(senha) {
    this.senha = senha;
    return this;
  }

  semNome() {
    this.nome = "";
    return this;
  }

  semEmail() {
    this.email = "";
    return this;
  }

  semSenha() {
    this.senha = "";
    return this;
  }

  build() {
    return { nome: this.nome, email: this.email, senha: this.senha };
  }
}

module.exports = UsuarioBuilder;
