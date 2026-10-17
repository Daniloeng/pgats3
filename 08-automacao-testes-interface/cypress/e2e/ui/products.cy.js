import { AutomationExerciseApi as api } from '../../support/api/automationExerciseApi'
import { ProductsPage } from '../../support/pages/ProductsPage'
import { ProductDetailPage } from '../../support/pages/ProductDetailPage'

describe('UI | Produtos', () => {
  let products

  before(() => {
    cy.fixture('products').then((data) => {
      products = data
    })
  })

  beforeEach(() => {
    ProductsPage.visit()
  })

  context('Cenários felizes', () => {
    it('CT-UI-008 - Deve listar todos os produtos e exibir os detalhes de um produto', () => {
      const { blueTop } = products

      ProductsPage.elements.productCards().should('have.length.greaterThan', 0)
      ProductsPage.openProduct(blueTop.id)

      cy.location('pathname').should('eq', `/product_details/${blueTop.id}`)
      ProductDetailPage.elements.name().should('have.text', blueTop.name)
      ProductDetailPage.elements.price().should('have.text', blueTop.price)
      ProductDetailPage.elements.category().should('contain', blueTop.category)
      ProductDetailPage.elements.availability().should('be.visible')
      ProductDetailPage.elements.condition().should('be.visible')
      ProductDetailPage.elements.brand().should('contain', blueTop.brand)
    })

    it('CT-UI-009 - Deve buscar produtos por um termo existente', () => {
      ProductsPage.search(products.searchTerm)

      ProductsPage.elements.title().should('have.text', 'Searched Products')
      // Oráculo: a UI deve exibir exatamente os mesmos produtos que a API de busca retorna.
      api.searchProduct(products.searchTerm).then(({ body }) => {
        const expectedNames = body.products.map((product) => product.name)
        expect(expectedNames, 'API deve retornar resultados').to.have.length.greaterThan(0)

        ProductsPage.elements.productNames().should('have.length', expectedNames.length)
        ProductsPage.elements.productNames().each(($name) => {
          expect(expectedNames).to.include($name.text().trim())
        })
      })
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-010 - Não deve retornar produtos ao buscar um termo inexistente', () => {
      ProductsPage.search(products.nonExistentSearchTerm)

      ProductsPage.elements.title().should('have.text', 'Searched Products')
      ProductsPage.elements.productCards().should('not.exist')
    })
  })
})
