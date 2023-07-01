// eslint-disable-next-line import/extensions
import FireStore from '@/firebase/Pos-db'

export default {
  getPrinters: async ({ commit }) => {
    const printersDb = new FireStore('printers')
    const printers = await printersDb.readAll()
    commit('setPrinters', printers)
  }

}
