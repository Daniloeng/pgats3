import { toApiPayload } from '../factories/userFactory'

/**
 * Cliente da API do Automation Exercise (https://automationexercise.com/api_list).
 *
 * Particularidades da API:
 *  - O status HTTP é quase sempre 200; o status "real" vem em body.responseCode.
 *  - O Content-Type é text/html, então o body chega como string e precisa de JSON.parse.
 *  - Endpoints POST/PUT/DELETE recebem parâmetros como form-data.
 *
 * Todas as funções retornam uma chain Cypress que produz { status, headers, duration, body }
 * já com o body convertido para objeto.
 */
const apiUrl = () => {
  const url = Cypress.expose('apiUrl')
  if (!url) {
    throw new Error('apiUrl não definida: configure "expose.apiUrl" no cypress.config.js')
  }
  return url
}

const normalize = (response) => ({
  status: response.status,
  headers: response.headers,
  duration: response.duration,
  body: typeof response.body === 'string' ? JSON.parse(response.body) : response.body,
})

const send = (method, path, { body, qs } = {}) =>
  cy
    .request({
      method,
      url: `${apiUrl()}${path}`,
      form: Boolean(body),
      body,
      qs,
      failOnStatusCode: false,
    })
    .then(normalize)

export const AutomationExerciseApi = {
  getProductsList: () => send('GET', '/productsList'),

  getBrandsList: () => send('GET', '/brandsList'),

  searchProduct: (term) => send('POST', '/searchProduct', { body: { search_product: term } }),

  verifyLogin: (email, password) => send('POST', '/verifyLogin', { body: { email, password } }),

  createAccount: (user) => send('POST', '/createAccount', { body: toApiPayload(user) }),

  updateAccount: (user) => send('PUT', '/updateAccount', { body: toApiPayload(user) }),

  deleteAccount: (email, password) =>
    send('DELETE', '/deleteAccount', { body: { email, password } }),

  getUserDetailByEmail: (email) => send('GET', '/getUserDetailByEmail', { qs: { email } }),
}
