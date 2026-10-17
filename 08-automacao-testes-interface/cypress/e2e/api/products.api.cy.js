import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'

describe('API | Produtos e Marcas', () => {
  let products

  before(() => {
    cy.fixture('products').then((data) => {
      products = data
    })
  })

  it('CT-API-001 - GET /productsList deve retornar a lista de todos os produtos', () => {
    cy.fixture('schemas/productsList.schema.json').then((schema) => {
      api.getProductsList().then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        cy.wrap(body).validateSchema(schema)

        const blueTop = body.products.find((product) => product.id === products.blueTop.id)
        expect(blueTop).to.include({ name: products.blueTop.name, price: products.blueTop.price })
      })
    })
  })

  it('CT-API-002 - GET /brandsList deve retornar a lista de todas as marcas', () => {
    cy.fixture('schemas/brandsList.schema.json').then((schema) => {
      api.getBrandsList().then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        cy.wrap(body).validateSchema(schema)

        const brandNames = body.brands.map((item) => item.brand)
        expect(brandNames).to.include.members([products.blueTop.brand, products.menTshirt.brand])
      })
    })
  })

  it('CT-API-003 - POST /searchProduct deve retornar os produtos relacionados ao termo', () => {
    const term = products.searchTerm.toLowerCase()

    cy.fixture('schemas/productsList.schema.json').then((schema) => {
      api.searchProduct(term).then(({ status, body }) => {
        expect(status).to.eq(200)
        expect(body.responseCode).to.eq(200)
        cy.wrap(body).validateSchema(schema)

        body.products.forEach((product) => {
          const searchable = `${product.name} ${product.category.category}`.toLowerCase()
          expect(searchable, `produto "${product.name}"`).to.contain(term)
        })
      })
    })
  })
})
