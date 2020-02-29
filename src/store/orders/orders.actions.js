import { cloneDeep } from 'lodash'
import ItemsDB from '@/firebase/Pos-db'

export default {
  /**
   * Fetch Items
   */
  getOrders: async ({ commit }, { clientId, active }) => {
    const itemsDb = new ItemsDB('orders')

    let constraints = []

    if (clientId) {
      constraints = [...constraints, ['clientId', '==', clientId]]
    }
    /* If we are looking for active items, set a constraint for the type */
    if (active) {
      constraints = [...constraints, ['active', '==', active]]
    }

    /* If there are no constraints, reset it to null */
    if (constraints.length === 0) {
      constraints = null
    }
    const items = await itemsDb.readAll(constraints)
    commit('setOrders', items)
  },
  /**
   * Create an Item
   */
  createOrder: async ({ commit, dispatch }, item) => {
    // userId

    const itemsDb = new ItemsDB('clients')
    commit('setLoading', true)

    const createdItem = await itemsDb.create(item)
    commit('addItem', createdItem)
    dispatch('getItems', { active: true })
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

  editOrder: ({ state, commit }, item) => {
    commit('setEditedIndex', state.items.indexOf(item))
    commit('setEditedItem', item)
    commit('setDialog', true)
  },

  changeProductToActiveOrder: ({ state, commit }, { product, value }) => {


    /* Add product to  activeOrder products list */
    let newValue = state.activeOrder.products[product.printer][product.id].value;
    newValue += value
    if( newValue < 0 ) {
      newValue = 0; 
    } else {
      commit('setProductInActiveOrder', { product, value: newValue })
      commit('setProductInActiveOrder', { product, value: newValue })

      /* Add or subtract to the total */
      console.log(value)
      commit('setTotal', value)
      
      /* Add or subtract to the total per type */
      commit('setTotalPerType', { productType: product.type, value }) 
    }



  },

  setActiveOrderForClient: ({ state, commit }, client) => {
    const activeOrder = cloneDeep(state.activeOrderTemplate);
    activeOrder.user = {
      id: client.id,
      name: client.name,
      table: client.table
    }
    commit('setActiveOrder', activeOrder)
  },

  setProductRemark: ({ state, commit }, { value, product}) => {
    const activeOrder = cloneDeep(state.activeOrder);
    activeOrder.products[product.printer][product.id].remark = value
    commit('setActiveOrder', activeOrder)

  },

  setActiveOrderTemplate: ({ commit, rootState }, products) => {
    /* Loop over the products and create the template for the orders */
    const activeOrderTemplate = {
      user: {
        id: null,
        table: null,
        name: null
      },
      total: 0,
      totals: {},
      waiter: rootState.authentication.user.id,
      remarks: '',
      products: {}
    }

    for (let i = 0; i < products.length; i += 1) {
      const product = products[i]
      /* If the product is not active, don't add it to the order template */
      if (product.active !== true) return
      const productToSave = {
        price: product.price,
        name: product.name,
        type: product.type,
        options: {},
        value: 0,
        remark: ''
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

  setActiveOrderOption: ({ commit }, { value, product, option}) => {
    console.log(option)
    commit('setActiveOrderOption', {value, product})
      
  } 
}
