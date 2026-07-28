// utils/testRunner.js
// Pequeno executor de testes, apenas para manter o exemplo autocontido sem
// depender de um framework externo (Jest/Mocha) para rodar neste ambiente.
// Em um projeto real, isso seria substituído por um framework de testes.
function assert(condicao, mensagem) {
  if (!condicao) {
    throw new Error(mensagem);
  }
}

async function executarSuite(nomeSuite, testes) {
  console.log(`\n=== Suíte: ${nomeSuite} ===`);
  for (const [nomeTeste, funcaoTeste] of Object.entries(testes)) {
    try {
      await funcaoTeste();
      console.log(`   ✅ ${nomeTeste}`);
    } catch (erro) {
      console.log(`   ❌ ${nomeTeste} -> ${erro.message}`);
      process.exitCode = 1;
    }
  }
}

module.exports = { assert, executarSuite };
