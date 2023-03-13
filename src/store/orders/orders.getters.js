/* eslint-disable */

import { find, forOwn } from 'lodash'

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


  totals: (state, getters, rootState) => {
    const combinedProducts = function(p) {
      // Empty array to put all product objects in. A product object is the name and the total
      const combined = []
      // Loop through all products of the bar in the current order and put it in the products array
      forOwn(p.bar, (value) => combined.push(value));
      forOwn(p.keuken, (value) => combined.push(value));
      // We now have an array of products for each order
      // Reduce this to count totals per product
      const onlyTotals = combined.reduce((acc, curr) => {
        if(curr.name in acc) {
          acc[curr.name] = acc[curr.name]*1 + curr.value*1
        } else {
          acc[curr.name] = curr.value*1
        }
        return acc;
      }, {});
      return onlyTotals
    }

    const dates = []
    // Get all the products
    const products = [...rootState.products.products]
    // Get all the orders
    const orders = state.allOrders

    // Per product: add dates of orders and values per date
    const ordersByDay = orders.reduce( (acc, curr) => {
      // Get the date for the object key
      const timestamp = curr.createTimestamp
      const date = new Date(timestamp).toLocaleString(undefined, {dateStyle: 'short'})
      // Create an object per day, with all orders of that day
      const combined = combinedProducts(curr.products)
      if(date in acc) {
        forOwn(acc[date], (value, key) => {
          const newVal = combined[key] + acc[date][key]
          acc[date][key] = newVal
        });
      } else {
        acc[date] = combined
        // extra: add to an array to keep the dates
        dates.push(date)
      }
      return acc;
    }, {})
    //


    const productsWithValues = products.map(p => {
      let allDays = 0
      for(let i = 0; i < dates.length; i += 1){
        allDays += ordersByDay[dates[i]][p.name]*1
        p[dates[i]] = ordersByDay[dates[i]][p.name]*1 || 0
      }
      p.total = allDays
      return p
    })
    const datesForHeaders = dates.map(d => {
      const obj = {
        text: d,
        align: 'start',
        sortable: true,
        value: d,
      }
      return obj
    })

    const headers = [

      {
        text: 'Product',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      ...datesForHeaders,
      {
        text: 'Totaal',
        align: 'start',
        sortable: true,
        value: 'total'
      },
      {
        text: 'Type',
        align: 'start',
        sortable: true,
        value: 'type',
      },
      {
        text: 'Printer',
        align: 'start',
        sortable: true,
        value: 'printer',
      }
    ]

    return { headers, items: productsWithValues }

  },

  correctOrder: (state ) => {
    let errorMessage = ''
    if( state.activeOrder ) {
      // 1) Check if there are products
      if(state.activeOrder.products) {
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

  combinedOrders: (state) => {
    console.log('here', state.orders)
    if(state.orders.length < 1) return null
    //
    // console.log(state.orders)
    let total = 0

    const afrekeningPrinter = state.orders.reduce((merged, order) => {
      // Count up products
      for (const [location, products] of Object.entries(order.products)) {
        for (const [productKey, product] of Object.entries(products)) {
          if(merged[productKey] === undefined) {
            merged[productKey] = product
            total = total + product.value * 1
          } else {
            merged[productKey].value = merged[productKey].value + product.value * 1
            total = total + product.value * 1
          }
        }
      }
      return merged;
    }, {});

    const printer = {
      afrekening: afrekeningPrinter
    }

    const final = {
      printStatus: state.orders[0].printStatus,
      remarks: state.orders[0].remarks,
      user: state.orders[0].user,
      waiter: state.orders[0].waiter,
      total: total,
      products: printer,
      orderType: 'afrekening'
    }









    return final


  }

}
