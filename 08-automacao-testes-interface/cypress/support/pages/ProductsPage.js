/**
 * Página /products — listagem, busca e adição ao carrinho.
 */
export const ProductsPage = {
  elements: {
    title: () => cy.get('.features_items h2.title'),
    searchInput: () => cy.get('#search_product'),
    searchButton: () => cy.get('#submit_search'),
    productCards: () => cy.get('.features_items .product-image-wrapper'),
    productNames: () => cy.get('.features_items .productinfo p'),
    viewProduct: (id) => cy.get(`a[href="/product_details/${id}"]`),
    addToCart: (id) => cy.get(`.productinfo a[data-product-id="${id}"]`),
    cartModal: () => cy.get('#cartModal'),
    continueShopping: () => cy.contains('#cartModal button', 'Continue Shopping'),
    viewCartFromModal: () => cy.contains('#cartModal a', 'View Cart'),
  },

  visit() {
    cy.visit('/products')
    this.elements.title().should('have.text', 'All Products')
  },

  search(term) {
    this.elements.searchInput().clear().type(term)
    this.elements.searchButton().click()
  },

  openProduct(id) {
    this.elements.viewProduct(id).click()
  },

  addProductToCart(id) {
    this.elements.addToCart(id).first().click()
    this.elements
      .cartModal()
      .should('be.visible')
      .and('contain', 'Your product has been added to cart.')
  },

  continueShopping() {
    this.elements.continueShopping().click()
    this.elements.cartModal().should('not.be.visible')
  },

  viewCartFromModal() {
    this.elements.viewCartFromModal().click()
  },
}
