import { ProductsPage } from '../../support/pages/ProductsPage'
import { ProductDetailPage } from '../../support/pages/ProductDetailPage'
import { CartPage } from '../../support/pages/CartPage'

describe('UI | Carrinho de compras', () => {
  let products
  let messages

  before(() => {
    cy.fixture('products').then((data) => {
      products = data
    })
    cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  context('Cenários felizes', () => {
    it('CT-UI-011 - Deve adicionar dois produtos ao carrinho com preço, quantidade e total corretos', () => {
      const { blueTop, menTshirt } = products

      ProductsPage.visit()
      ProductsPage.addProductToCart(blueTop.id)
      ProductsPage.continueShopping()
      ProductsPage.addProductToCart(menTshirt.id)
      ProductsPage.viewCartFromModal()

      CartPage.elements.rows().should('have.length', 2)
      ;[blueTop, menTshirt].forEach((product) => {
        CartPage.elements.row(product.id).should('contain', product.name)
        CartPage.elements.price(product.id).should('have.text', product.price)
        CartPage.elements.quantity(product.id).should('have.text', '1')
        CartPage.elements.total(product.id).should('have.text', product.price)
      })
    })

    it('CT-UI-012 - Deve adicionar um produto com quantidade personalizada pela página de detalhes', () => {
      const { blueTop } = products
      const quantity = 4

      ProductDetailPage.visit(blueTop.id)
      ProductDetailPage.setQuantity(quantity)
      ProductDetailPage.addToCart()
      ProductDetailPage.viewCartFromModal()

      CartPage.elements.quantity(blueTop.id).should('have.text', String(quantity))
      CartPage.elements.total(blueTop.id).should(($total) => {
        const expected = CartPage.parsePrice(blueTop.price) * quantity
        expect(CartPage.parsePrice($total.text())).to.equal(expected)
      })
    })
  })

  context('Cenários alternativos', () => {
    it('CT-UI-013 - Deve remover o produto e exibir o carrinho vazio', () => {
      const { blueTop } = products

      ProductsPage.visit()
      ProductsPage.addProductToCart(blueTop.id)
      ProductsPage.viewCartFromModal()
      CartPage.elements.row(blueTop.id).should('be.visible')

      CartPage.removeProduct(blueTop.id)

      CartPage.elements.emptyCart().should('be.visible').and('contain', messages.emptyCart)
    })
  })
})
