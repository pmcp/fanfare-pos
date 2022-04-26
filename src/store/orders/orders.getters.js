import { find } from 'lodash'

export default {
  /**
   * Check if a product has deletion pending
   */
  isItemDeletionPending: state => itemId =>
    state.itemDeletionPending.includes(itemId),

  inActiveOrder: state => (printer, productId) => {
    find(
      state.activeOrder.products[printer],
      product => product.id === productId
    )
  },
  correctOrder: (state ) => {
    let errorMessage = ''
    if( state.activeOrder ) {
      // 1) Check if there are products
      console.log('state.activeOrder.products')
      if(state.activeOrder.products) {
        console.log('there are products')
        //  Per printer (state.activeOrder.products, check if there are products)
          //  Per product, check if there is a quantity
            //  Per product, check if it should have options (in base product settings: rootState.products.options.active: true,
        //      AND check if it has multiple options (or one): rootState.products.options.selectMultiple: true)


          // if options.true, for this product, check if there are as much option (

      } else {
        console.log('there are no products')
        errorMessage = 'There are no products'
      }
    } else {
      errorMessage = 'There is no order yet'
    }

    console.log(errorMessage)
    return errorMessage

  },
}
