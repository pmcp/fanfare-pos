const _ = require('lodash')

export default {
  /* Product input name */
  setProductNameToCreate: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  /* Products */
  setProducts: (state, products) => (state.products = products),
  addProduct: (state, product) => state.products.push(product),
  removeProductById: (state, productId) => {
    const index = state.products.findIndex(product => product.id === productId)
    state.products.splice(index, 1)
  },

  /* Products deletion */
  addProductDeletionPending: (state, productId) =>
    state.productDeletionPending.push(productId),
  removeProductDeletionPending: (state, productId) => {
    const index = state.products.findIndex(product => product.id === productId)
    state.productDeletionPending.splice(index, 1)
  },

  /* Product creation */
  setProductCreationPending: (state, value) =>
    (state.productCreationPending = value),

  // THIS IS ME
  /* Edit Product */
  editProduct: (state, { field, value, subfield }) => {
    if (subfield !== null && subfield) {
      // console.log(
      //   `Store 'Products': mutation for editProduct.${field}.${subfield}, value = '${value}'`
      // )
      state.editedProduct[field][subfield] = value
      const editedProduct = { ...state.editedProduct }
      state.editedProduct = _.cloneDeep(editedProduct)
    } else {
      // console.log(
      //   `Store 'Products': mutation for editProduct.${field}, value = '${value}'`
      // )
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
    // console.log(
    //   `Store 'Products': mutation for state.editedProduct.options.value[${key}], value = '${value}'`
    // )
    state.editedProduct.options.value[key] = value
    state.editedProduct = _.cloneDeep(state.editedProduct)
  },
  setEditedItem: (state, value) => {
    console.log(state.editedProduct, value)
    state.editedProduct = _.cloneDeep(value)
    console.log(state.editedProduct)
  },
  setEditedIndex: (state, value) => (state.editedIndex = value),
  saveEditedProduct: state =>
    Object.assign(state.products[state.editedIndex], state.editedProduct),
  addEditedProduct: state => state.products.push(state.editedProduct),
  setDialog: (state, value) => {
    state.dialog = value
  },
  deleteItem: (state, value) => state.products.splice(value, 1)
}
