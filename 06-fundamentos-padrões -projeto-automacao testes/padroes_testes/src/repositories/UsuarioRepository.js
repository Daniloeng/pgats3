// repositories/UsuarioRepository.js
// Substitui a variável global `usuarioCadastradoNoBanco` (alto acoplamento e
// vazamento de estado entre testes). Cada teste pode instanciar seu próprio
// repositório, garantindo isolamento de dados entre cenários.
class UsuarioRepository {
  constructor() {
    this.usuarios = [];
  }

  salvar(usuario) {
    this.usuarios.push(usuario);
    return usuario;
  }

  buscarPorCredenciais(email, senha) {
    return this.usuarios.find((u) => u.email === email && u.senha === senha);
  }

  total() {
    return this.usuarios.length;
  }
}

module.exports = UsuarioRepository;
