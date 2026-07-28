// utils/wait.js
// Espera assíncrona e não-bloqueante. O código original usava um loop `do/while`
// que travava a thread do Node de forma síncrona — má prática que deixa o teste
// lento e não escalável (impede paralelismo real).
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { esperar };
