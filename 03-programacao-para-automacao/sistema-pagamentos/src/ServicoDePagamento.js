export class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    // Define a categoria com base no valor informado
    const categoria = valor > 100.00 ? 'cara' : 'padrão';

    const novoPagamento = {
      codigoBarras,
      empresa,
      valor,
      categoria
    };

    this.pagamentos.push(novoPagamento);
    return novoPagamento;
  }

  consultarUltimoPagamento() {
    if (this.pagamentos.length === 0) {
      return null; // Retorna null caso nenhum pagamento tenha sido feito ainda
    }
    // Retorna o último elemento do array de pagamentos
    return this.pagamentos[this.pagamentos.length - 1];
  }
}
