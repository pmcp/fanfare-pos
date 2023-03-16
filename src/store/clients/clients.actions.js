import firebase from 'firebase/app'
// eslint-disable-next-line import/extensions
import ItemsDB from '@/firebase/Pos-db'
// eslint-disable-next-line import/extensions
import router from '@/router'



export default {
  /**
   * Fetch Items
   */
  getClients: async ({ commit }, { active, date }) => {


    const itemsDb = new ItemsDB('clients')
    let constraints = []
    if(date) {

      const startOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfToday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

      constraints = [...constraints, ['updateTimestamp', ">=", firebase.firestore.Timestamp.fromDate(startOfToday)]]
      constraints = [...constraints, ['updateTimestamp', "<", firebase.firestore.Timestamp.fromDate(endOfToday)]]
    }
    /* If we are looking for active items, set a constraint for the type */
    if (active) {
      constraints = [...constraints, ['active', '==', active]]
    }
    console.log(constraints)
    const items = await itemsDb.readAll(constraints)
    console.log(items)
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
  },

  /**
   * Update an Item
   */
  updateClient: async ({ commit }, client) => {
    const itemsDb = new ItemsDB('clients')
    commit('setLoading', true)
    await itemsDb.update(client)
    console.log(client)
    commit('setLoading', false)
  },

  setClientNonActive: async ({ dispatch }, clientId) => {
    // Was here: need to get + update this client with active: false
    const itemsDb = new ItemsDB('clients')
    const client = await itemsDb.read(clientId)
    console.log(client)
    client.active = false
    console.log(client)
    dispatch('updateClient', client)

    //
  },

}
