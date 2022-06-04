// eslint-disable-next-line import/extensions
import ItemsDB from '@/firebase/Pos-db'
// eslint-disable-next-line import/extensions
import router from '@/router'

export default {
  /**
   * Fetch Items
   */
  getClients: async ({ commit }, { active }) => {
    const itemsDb = new ItemsDB('clients')
    let constraints = null
    /* If we are looking for active items, set a constraint for the type */
    if (active) {
      constraints = [['active', '==', active]]
    }
    const items = await itemsDb.readAll(constraints)

    commit('setClients', items)
  },
  /**
   * Create an Item
   */
  createClient: async ({ commit, dispatch }, item) => {
    const itemsDb = new ItemsDB('clients')
    commit('setLoading', true)

    const createdItem = await itemsDb.create(item)
    commit('addClient', createdItem)
    dispatch('getClients', { active: true })
    commit('setLoading', false)

    // Got user, will now move to form

    console.log(createdItem)
    dispatch('orders/setActiveOrderForClient', createdItem, { root: true })
    router.push(`/clients/${createdItem.id}/order`)
  },

  /**
   * Delete an Item
   */
  deleteClient: async ({ commit }, item) => {
    const itemsDb = new ItemsDB('clients')
    commit('setLoading', true)
    const deletedItem = await itemsDb.delete(item.id)
    commit('deleteProduct', deletedItem)
    commit('setLoading', false)
  },

  editClient: ({ state, commit }, item) => {
    commit('setEditedIndex', state.items.indexOf(item))
    commit('setEditedItem', item)
    commit('setDialog', true)
  }
}
