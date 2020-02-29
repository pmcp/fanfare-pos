import { find } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isItemDeletionPending: state => itemId =>
    state.itemDeletionPending.includes(itemId),
  
  inActiveOrder: state => (printer, productId) => {
    find(state.activeOrder.products[printer], product => product.id === productId)
  } 
}
