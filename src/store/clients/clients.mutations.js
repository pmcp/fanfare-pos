// const _ = require('lodash')

export default {
  // /* Products */
  setClients: (state, clients) => (state.clients = clients),
  addClient: (state, client) => state.clients.push(client),
  // removeProductById: (state, productId) => {
  //   const index = state.products.findIndex(product => product.id === productId)
  //   state.products.splice(index, 1)
  // },

  setLoading: (state, value) => (state.clientsLoading = value)
}
