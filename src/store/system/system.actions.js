// eslint-disable-next-line import/extensions
import FireStore from '@/firebase/Pos-db'

export default {
  getPrinters: async ({ commit }) => {
    const printersDb = new FireStore('printers')
    const printers = await printersDb.readAll()
    commit('setPrinters', printers)
  },
  getNotifications: async ({ commit }) => {
    const notifDb = new FireStore('systemNotifications')
    const notifications = await notifDb.readAll()
    commit('setNotifications', notifications)
  }

}
