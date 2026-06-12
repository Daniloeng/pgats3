import assert from 'assert';
import { fazerLogin } from '../src/SistemaLogin.js';

describe('Testes do Sistema de Login (Desafio)', () => {

  it('1) Deve retornar sucesso ao informar e-mail e senha corretos', () => {
    const resultado = fazerLogin('danilo@teste.com', 'senhaCerta123');
    assert.strictEqual(resultado, 'Login realizado com sucesso');
  });

  it('2) Deve alertar para renovação caso a credencial esteja expirada', () => {
    const resultado = fazerLogin('joao@expirado.com', '123456expirou');
    assert.strictEqual(resultado, 'Renove suas credenciais');
  });

  it('3) Deve informar que as credenciais estão incorretas se o usuário não for encontrado', () => {
    const resultado = fazerLogin('nao_existo@teste.com', 'qualquerSenha');
    assert.strictEqual(resultado, 'As credenciais estão incorretas');
  });

  it('4) Deve informar que as credenciais estão incorretas se a senha estiver errada', () => {
    const resultado = fazerLogin('danilo@teste.com', 'senhaErradaErrada');
    assert.strictEqual(resultado, 'As credenciais estão incorretas');
  });

});
