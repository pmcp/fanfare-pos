import { find, filter } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isProductDeletionPending: state => productId =>
    state.productDeletionPending.includes(productId),

  filteredProducts: state => productType => {
    return filter(state.products, { type: productType })
  },

  selectedProducts: (state, getters, rootState) => {
    if(!rootState.orders) return [];
    return state.products.filter(product => rootState.orders.activeOrder.products[product.printer][product.id].value > 0)
  },

  /**
   * Get product by id
   */
  getProductById: state => productId =>
    find(state.products, product => product.id === productId)
}
