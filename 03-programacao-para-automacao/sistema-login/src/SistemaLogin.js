// Pré-requisito: Declaração do vetor de usuários
export const usuarios = [
  { id: 1, nome: "Danilo", email: "danilo@teste.com", senha: "senhaCerta123", expirado: false },
  { id: 2, nome: "João Expirado", email: "joao@expirado.com", senha: "123456expirou", expirado: true },
  { id: 3, nome: "Maria", email: "maria@teste.com", senha: "mariaSenha789", expirado: false }
];

// Desafio: Função para realizar login
export function fazerLogin(emailInformado, senhaInformada) {
  // Busca o usuário pelo e-mail informado utilizando o método .find()
  const usuarioEncontrado = usuarios.find(u => u.email === emailInformado);

  // 1. Validação: Usuário não encontrado
  if (!usuarioEncontrado) {
    return 'As credenciais estão incorretas';
  }

  // 2. Validação: Senha incorreta para o e-mail encontrado
  if (usuarioEncontrado.senha !== senhaInformada) {
    return 'As credenciais estão incorretas';
  }

  // 3. Validação: Credenciais expiradas
  if (usuarioEncontrado.expirado) {
    return 'Renove suas credenciais';
  }

  // 4. Sucesso: Se passou por todas as validações acima
  return 'Login realizado com sucesso';
}
