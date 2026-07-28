// config/config.js
// Centraliza valores de ambiente. Nada de URL hardcoded dentro das classes de página.
module.exports = {
  URL_SISTEMA: process.env.URL_SISTEMA || "https://api.sistema-moderno.local/v1",
};
