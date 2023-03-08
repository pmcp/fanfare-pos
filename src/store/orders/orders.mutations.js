import { cloneDeep, includes } from 'lodash'

export default {
  // /* Products */
  setOrders: (state, orders) => (state.orders = orders),
  setAllOrders: (state, orders) => (state.allOrders = orders),
  addOrder: (state, order) => state.orders.push(order),
  setLoading: (state, value) => (state.ordersLoading = value),
  setTotal: (state, value) => (state.activeOrder.total += value),
  setTotalPerType: (state, { productType, value }) =>
    (state.activeOrder.totals[productType] += value),
  setActiveOrderTemplate: (state, value) => {
    state.activeOrderTemplate = value
  },
  setActiveOrder: (state, value) => {
    console.log(value)
    state.activeOrder = cloneDeep(value)
  },
  setProductInActiveOrder: (state, { product, value }) => {
    console.log(product, value)
    state.activeOrder.products[product.printer][product.id].value = value
  },
  setProductOptionsInActiveOrder: (state, { product, value, add, position }) => {
    if(add) {

      // if(product.options.selectMultiple) val = []
      // state.activeOrder.products[product.printer][product.id].options[position] = null
    } else {
      console.log('gonna delete' , product, value, position)
      console.log(state.activeOrder.products[product.printer][product.id].options)
      console.log(state.activeOrder.products[product.printer][product.id].options[position+1])
      delete state.activeOrder.products[product.printer][product.id].options.splice(position, 1)
    }

    state.activeOrder = cloneDeep(state.activeOrder)
  },
  setActiveOrderOption: (state, { value, product, option, multiple }) => {
    console.log(value, option, multiple)
    if(multiple) {
      if(includes(state.activeOrder.products[product.printer][product.id].options[option+1], value)) {
        const filtered = state.activeOrder.products[product.printer][product.id].options[option+1].filter(item => item !== value)
        state.activeOrder.products[product.printer][product.id].options[option+1] = [...filtered]
      } else {
        state.activeOrder.products[product.printer][product.id].options[option+1] = [...state.activeOrder.products[product.printer][product.id].options[option], value]
      }
    } else {
      console.log('here', value)
      state.activeOrder.products[product.printer][product.id].options[option] = value
      state.activeOrder = cloneDeep(state.activeOrder)
    }
  }
}
