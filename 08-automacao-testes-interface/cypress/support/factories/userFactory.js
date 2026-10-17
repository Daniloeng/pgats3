import { faker } from '@faker-js/faker'

/**
 * Gera um usuário único com dados realistas.
 * Cada execução cria um e-mail diferente, garantindo independência entre testes.
 * @param {object} overrides - campos a sobrescrever
 */
export function buildUser(overrides = {}) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })

  return {
    name: `${firstName} ${lastName}`,
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6).toLowerCase()}@test.com`,
    password: faker.internet.password({ length: 12 }),
    title: 'Mr',
    birthDay: String(birthDate.getDate()),
    birthMonth: String(birthDate.getMonth() + 1),
    birthYear: String(birthDate.getFullYear()),
    firstName,
    lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'Canada',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.string.numeric(9),
    ...overrides,
  }
}

/**
 * Converte o usuário para o payload (form-data) esperado pela API /createAccount.
 */
export function toApiPayload(user) {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    title: user.title,
    birth_date: user.birthDay,
    birth_month: user.birthMonth,
    birth_year: user.birthYear,
    firstname: user.firstName,
    lastname: user.lastName,
    company: user.company,
    address1: user.address1,
    address2: user.address2,
    country: user.country,
    zipcode: user.zipcode,
    state: user.state,
    city: user.city,
    mobile_number: user.mobileNumber,
  }
}

export function buildCard() {
  const expiry = faker.date.future({ years: 3 })
  return {
    nameOnCard: faker.person.fullName(),
    number: '4111111111111111',
    cvc: faker.string.numeric(3),
    expiryMonth: String(expiry.getMonth() + 1).padStart(2, '0'),
    expiryYear: String(expiry.getFullYear()),
  }
}
