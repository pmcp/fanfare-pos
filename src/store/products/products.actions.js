import { orderBy } from 'lodash'
// eslint-disable-next-line import/extensions
import ItemsDB from '@/firebase/Pos-db'

export default {
  /**
   * Fetch products of current loggedin user
   */
  getProducts: async ({ commit, dispatch }, { active }) => {
    const itemsDb = new ItemsDB('products')
    let constraints = []
    if (active) {
      constraints = [...constraints, ['active', '==', active]]
    }
    /* If there are no constraints, reset it to null */
    if (constraints.length === 0) {
      constraints = null
    }



    const products = await itemsDb.readAll(constraints)
    // To be sure: change "Order" string to number, cos some of them are turned into strings
    const orderToString = products.map(x => x = { ...x, order: x.order*1 } )
    const ordered = orderBy(orderToString, ['order'], ['asc'])
    commit('setProducts', ordered)

    dispatch('orders/setActiveOrderTemplate', products, { root: true })
  },

  /**
   * Create a product
   */
  createProduct: async ({ commit }, product) => {


    const itemsDb = new ItemsDB('products')
    commit('setLoading', true)
    const createdProduct = await itemsDb.create(product)
    commit('addProduct', createdProduct)
    commit('setLoading', false)
  },

  /**
   * Update a product
   */
  updateProduct: async ({ commit }, product) => {
    const itemsDb = new ItemsDB('products')
    commit('setLoading', true)
    await itemsDb.update(product)
    commit('setLoading', false)
  },

  /**
   * Delete a product
   */
  deleteProduct: async ({ commit }, product) => {
    const itemsDb = new ItemsDB('products')
    commit('setLoading', true)
    const deletedProduct = await itemsDb.delete(product.id)
    commit('deleteProduct', deletedProduct)
    commit('setLoading', false)
  },

  saveItem: ({ state, commit, dispatch }) => {
    if (state.editedIndex > -1) {
      commit('saveEditedProduct')
      dispatch('updateProduct', state.editedProduct)
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

  move: async ({ state, dispatch }, { item, direction }) => {
    console.log(item.order + direction)

    const surroundingProduct = state.products[item.order*1 + direction*1 ]
    const updatedItem = {...item, order: item.order*1 + direction*1}
    const updatedSurroundingProduct = {...surroundingProduct, order: surroundingProduct.order*1 + direction*-1 }
    console.log(updatedSurroundingProduct)

    console.log(updatedItem, updatedSurroundingProduct)
    await dispatch('updateProduct', updatedItem)
    await dispatch('updateProduct', updatedSurroundingProduct)
    dispatch('getProducts', false)
    // console.log(state.products)
    // console.log(item, direction)
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
