const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  // Bloqueia anúncios/rastreadores do site: reduz flakiness (popups "vignette") e acelera os testes.
  blockHosts: [
    '*googlesyndication.com',
    '*doubleclick.net',
    '*googleadservices.com',
    '*google-analytics.com',
    '*googletagmanager.com',
    '*adservice.google.com',
    '*fundingchoicesmessages.google.com',
  ],
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Automation Exercise - Relatório de Testes',
    reportFilename: 'index',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
  },
  env: {
    apiUrl: 'https://automationexercise.com/api',
  },
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
