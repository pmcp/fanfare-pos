import { cloneDeep } from 'lodash'

export default {
  // /* Products */
  setOrders: (state, orders) => (state.orders = orders),
  addOrder: (state, order) => state.orders.push(order),
  setLoading: (state, value) => (state.ordersLoading = value),
  setActiveOrderTemplate: (state, value) => (state.activeOrderTemplate = value),
  setActiveOrder: (state, value) => {
    state.activeOrder = cloneDeep(value)
  },
  setProductInActiveOrder: (state, { product, value }) => {
    state.activeOrder.products[product.printer][product.id].value = value
    state.activeOrder = cloneDeep(state.activeOrder)
  },
  setActiveOrderOption: (state, { product, value }) => {
    console.log(product, value, state.test)
  },
}
