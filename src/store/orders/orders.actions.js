import { cloneDeep } from 'lodash'
// eslint-disable-next-line import/extensions
import ItemsDB from '@/firebase/Pos-db'
// eslint-disable-next-line import/extensions
import router from '@/router'

export default {
  /**
   * Fetch Items
   */
  getOrders: async ({ commit }, { clientId, active }) => {
    console.log('getOrders', clientId, active)
    const itemsDb = new ItemsDB('orders')
    let constraints = []
    constraints = [...constraints, ['orderType', '==', 'normal']]
    if (clientId) {
      console.log('getOrders', clientId, active)
      constraints = [...constraints, ['user.id', '==', clientId]]
    }
    /* If we are looking for active items, set a constraint for the type */
    if (active) {
      constraints = [...constraints, ['active', '==', active]]
    }

    /* If there are no constraints, reset it to null */
    if (constraints.length === 0) {
      constraints = null
    }

    // console.log(constraints)
    const items = await itemsDb.readAll(constraints)
    commit('setOrders', items)
    console.log(items)


  },

  getAllOrders: async ({ commit }) => {
    console.log('getting all orders')
    const itemsDb = new ItemsDB('orders')
    const items = await itemsDb.readAll()
    commit('setAllOrders', items)
  },

  getClientOrders: async ({ dispatch }, client) => {
    dispatch('getOrders', { clientId: client.client, active: false })
  },
  /**
   * Create an Item
   */
  createOrderFb: async ({ commit, dispatch }, item) => {


    console.log('gonna save order', item)
    //
    const itemsDb = new ItemsDB('orders')
    commit('setLoading', true)
    if(!item.orderType) item.orderType = 'normal'
    console.log(item)


    await itemsDb.create(item)
    dispatch('getOrders', { active: true })
    commit('setLoading', false)
  },

  /**
   * Delete an Item
   */
  deleteOrder: async ({ commit }, item) => {
    const itemsDb = new ItemsDB('clients')
    commit('setLoading', true)
    const deletedItem = await itemsDb.delete(item.id)
    commit('deleteProduct', deletedItem)
    commit('setLoading', false)
  },

  // editOrder: ({ state, commit }, item) => {
  //   commit('setEditedIndex', state.items.indexOf(item))
  //   commit('setEditedItem', item)
  //   commit('setDialog', true)
  // },

  changeProductToActiveOrder: ({ state, commit }, { product, value, position }) => {
    /* Add product to  activeOrder products list */
    let newValue = state.activeOrder.products[product.printer][product.id].value
    newValue += value
    if (newValue >= 0) {
      commit('setProductInActiveOrder', { product, value: newValue })
      // if we are adding (value = 1) add an option (false or empty array) to options
      if(product.options.active) {
        if(value === 1){
          commit('setProductOptionsInActiveOrder', { product, value: newValue, add: true })
        }
        if(value === -1){
          commit('setProductOptionsInActiveOrder', { product, value: newValue, add: false, position })
        }
      }

      /* Add or subtract to the total */
      commit('setTotal', value)

      /* Add or subtract to the total per type */
      commit('setTotalPerType', { productType: product.type, value })
    }
  },

  setActiveOrderForClient: ({ state, commit }, client) => {
    if (state.setActiveOrderForClient !== null) {
      const activeOrder = cloneDeep(state.activeOrderTemplate)
        activeOrder.user = {
        id: client.id,
        name: client.name,
        table: client.table,
      }
      commit('setActiveOrder', activeOrder)
    }
  },

  setProductRemark: ({ state, commit }, { value, product }) => {
    const activeOrder = cloneDeep(state.activeOrder)
    activeOrder.products[product.printer][product.id].remark = value
    commit('setActiveOrder', activeOrder)
  },

  setActiveOrderTemplate: ({ commit, rootState }, products) => {
    /* Loop over the products and create the template for the orders */
    const activeOrderTemplate = {
      user: {
        id: null,
        table: null,
        name: null,
      },
      total: 0,
      totals: {},
      waiter: rootState.authentication.user.id,
      remarks: '',
      products: {},
      printStatus: 0
    }

    for (let i = 0; i < products.length; i += 1) {
      const product = products[i]
      /* If the product is not active, don't add it to the order template */
      if (product.active !== true) return
      const productToSave = {
        price: product.price,
        name: product.name,
        type: product.type,
        options: [],
        value: 0,
        order: product.order,
        remark: '',
      }

      /* Create the object to save the totals in */
      if (activeOrderTemplate.totals[product.type] === undefined) {
        activeOrderTemplate.totals[product.type] = 0
      }

      /* Create the object to save the products in */
      if (activeOrderTemplate.products[product.printer] === undefined) {
        activeOrderTemplate.products[product.printer] = {}
      }
      activeOrderTemplate.products[product.printer][product.id] = productToSave
    }

    commit('setActiveOrderTemplate', activeOrderTemplate)
  },

  setActiveOrderOption: ({ commit }, { value, product, option, multiple }) => {
      commit('setActiveOrderOption', { value, product, option, multiple })
  },

  createOrder: ({ state, dispatch }) => {
    dispatch('createOrderFb', state.activeOrder)
  //  Move back to home
    router.push(`/`)
  },


  printTotalOrder: async ({ dispatch }, order) => {
    console.log(order)
    order.printStatus = 0
    await dispatch('createOrderFb', order)
    // Set user as non active
    dispatch('clients/setClientNonActive', order.user.id, {root:true})
    router.push(`/`)
  },
}
