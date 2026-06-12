import assert from 'assert';
import { ServicoDePagamento } from '../src/ServicoDePagamento.js';

describe('Testes da Classe ServicoDePagamento', () => {
  let servico;

  // Executa antes de cada teste para garantir uma instância limpa
  beforeEach(() => {
    servico = new ServicoDePagamento();
  });

  it('Deve aplicar a categoria "cara" se o valor for maior que 100.00', () => {
    servico.pagar('0987-7656-3475', 'Samar', 156.87);
    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.categoria, 'cara');
    assert.strictEqual(ultimo.valor, 156.87);
  });

  it('Deve aplicar a categoria "padrão" se o valor for menor ou igual a 100.00', () => {
    servico.pagar('1111-2222-3333', 'Empresa X', 50.00);
    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.categoria, 'padrão');
  });

  it('Deve retornar exatamente o ÚLTIMO pagamento realizado', () => {
    servico.pagar('1111', 'Primeira', 40.00);
    servico.pagar('2222', 'Segunda', 200.00); // Este deve ser o último

    const ultimo = servico.consultarUltimoPagamento();

    assert.strictEqual(ultimo.codigoBarras, '2222');
    assert.strictEqual(ultimo.empresa, 'Segunda');
  });

  it('Deve retornar null se tentar consultar sem nenhum pagamento efetuado', () => {
    const ultimo = servico.consultarUltimoPagamento();
    assert.strictEqual(ultimo, null);
  });
});
