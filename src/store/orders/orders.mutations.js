import { cloneDeep, includes } from 'lodash'

export default {
  // /* Products */
  setOrders: (state, orders) => (state.orders = orders),
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
      let val = false
      if(product.options.selectMultiple) val = []
      state.activeOrder.products[product.printer][product.id].options[value] = val
    } else {
      console.log('gonna delete' , product, value, position)
      delete state.activeOrder.products[product.printer][product.id].options[position]
    }

    state.activeOrder = cloneDeep(state.activeOrder)
  },
  setActiveOrderOption: (state, { value, product, option, multiple }) => {
    console.log(value, product, option, multiple)
    if(multiple) {
      if(includes(state.activeOrder.products[product.printer][product.id].options[option+1], value)) {
        const filtered = state.activeOrder.products[product.printer][product.id].options[option+1].filter(item => item !== value)
        state.activeOrder.products[product.printer][product.id].options[option+1] = [...filtered]
      } else {
        state.activeOrder.products[product.printer][product.id].options[option+1] = [...state.activeOrder.products[product.printer][product.id].options[option], value]
      }
    } else {
      state.activeOrder.products[product.printer][product.id].options[option + 1] = product.options.value[value]
      state.activeOrder = cloneDeep(state.activeOrder)
    }
  }
}
