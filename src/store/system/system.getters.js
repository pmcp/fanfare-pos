
export default {
  printersWithIssues: state => {
    // First filter out active printers
    const activePrinters = state.printers.filter(p => p.active === true)
    return activePrinters.filter(p => p.status < 0)
  },
  notifications: state => {
    return state.notifications
  },
}
