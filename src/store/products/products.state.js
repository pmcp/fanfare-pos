export default {
  dialog: false,
  products: [],
  productNameToCreate: '',
  loading: false,
  productHeaders: [
    {
      text: 'Name',
      align: 'left',
      sortable: true,
      value: 'name'
    },
    { text: 'Id', value: 'id' },
    { text: 'Prijs', value: 'price' },
    { text: 'Extra Opties', value: 'options.active' },
    { text: 'Opmerking', value: 'remark' },
    { text: 'Printer', value: 'printer' },
    { text: 'Actions', value: 'action', sortable: false }
  ],
  editedIndex: -1,
  productTypes: ['voorgerecht', 'hoofgerecht', 'dessert', 'drank'],
  printers: ['keuken', 'bar', 'dessert'],
  options: [],
  newOption: '',
  editedProduct: {
    name: '',
    type: null,
    price: 0,
    extra: true,
    printer: null,
    options: {
      active: false,
      value: [],
      selectMultiple: false
    }
  },
  defaultProduct: {
    name: '',
    type: null,
    price: 0,
    extra: true,
    printer: null,
    options: {
      active: false,
      value: [],
      selectMultiple: false
    }
  }
}
