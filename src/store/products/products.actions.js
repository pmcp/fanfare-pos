import ProductsDB from '@/firebase/products-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getProducts: async ({ commit }) => {
    const productDb = new ProductsDB()
    const products = await productDb.readAll()
    commit('setProducts', products)
  },

  /**
   * Create a product
   */
  createProduct: async ({ commit }, product) => {
    const productDb = new ProductsDB()
    commit('setLoading', true)
    const createdProduct = await productDb.create(product)
    commit('addProduct', createdProduct)
    commit('setLoading', false)
  },

  /**
   * Delete a product
   */
  deleteProduct: async ({ commit }, product) => {
    const productDb = new ProductsDB()
    commit('setLoading', true)
    const deletedProduct = await productDb.delete(product.id)
    commit('deleteProduct', deletedProduct)
    commit('setLoading', false)
  },

  saveItem: ({ state, commit, dispatch }) => {
    if (state.editedIndex > -1) {
      commit('saveEditedProduct')
    } else {
      // commit('addEditedProduct')
      dispatch('createProduct', state.editedProduct)
    }
    dispatch('closeDialog')
  },

  editItem: ({ state, commit }, item) => {
    commit('setEditedIndex', state.products.indexOf(item))
    commit('setEditedItem', item)
    commit('setDialog', true)
  },

  closeDialog: ({ state, commit }) => {
    commit('setDialog', false)
    setTimeout(() => {
      commit('setEditedItem', state.defaultProduct)
      commit('setEditedIndex', -1)
    }, 300)
  }
  // deleteProduct: ({ state, commit }, item) => {
  //   // const index = state.products.indexOf(item)
  //   // TODO: ADD POPUP WITH ALERT
  //   // commit('deleteItem', index)
  // }
}
