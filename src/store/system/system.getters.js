
export default {
  printersWithIssues: state => {
    return state.printers.filter(p => p.status < 0)
  },
}
