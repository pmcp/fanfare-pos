const _ = require('lodash')

export default {
  // /* Products */
  setProducts: (state, products) => (state.products = products),
  addProduct: (state, product) => state.products.push(product),
  // removeProductById: (state, productId) => {
  //   const index = state.products.findIndex(product => product.id === productId)
  //   state.products.splice(index, 1)
  // },

  setLoading: (state, value) => (state.loading = value),

  /* Edit Product */
  editProduct: (state, { field, value, subfield }) => {
    if (subfield !== null && subfield) {
      state.editedProduct[field][subfield] = value
      const editedProduct = { ...state.editedProduct }
      state.editedProduct = _.cloneDeep(editedProduct)
    } else {
      state.editedProduct[field] = value
    }
  },
  setNewOption: (state, { value }) => (state.newOption = value),
  addOption: (state, { value }) => {
    state.editedProduct.options.value = [
      ...state.editedProduct.options.value,
      value
    ]
    state.newOption = ''
  },
  removeOption: (state, { key }) => {
    state.editedProduct.options.value.splice(key, 1)
  },
  editOption: (state, { value, key }) => {  
    state.editedProduct.options.value[key] = value
    state.editedProduct = _.cloneDeep(state.editedProduct)
  },
  setEditedItem: (state, value) => {
    state.editedProduct = _.cloneDeep(value)
  },
  setEditedIndex: (state, value) => (state.editedIndex = value),
  saveEditedProduct: state =>
    Object.assign(state.products[state.editedIndex], state.editedProduct),
  addEditedProduct: state => state.products.push(state.editedProduct),
  setDialog: (state, value) => {
    state.dialog = value
  },
  deleteProduct: (state, value) => state.products.splice(value, 1)
}
