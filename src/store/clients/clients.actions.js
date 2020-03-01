import ItemsDB from '@/firebase/Pos-db'

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
