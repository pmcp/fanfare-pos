import { find } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isClientDeletionPending: state => clientId =>
    state.itemDeletionPending.includes(clientId),

  /**
   * Get product by id
   */
  getClientById: state => clientId =>
    find(state.clients, client => client.id === clientId)
}
