import GenericDB from './generic-db'

export default class ProductsDB extends GenericDB {
  constructor() {
    super(`products`)
  }

  // Here you can extend UserProductsDB with custom methods
}
