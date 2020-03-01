// Start: nodemon index.js
const admin = require('firebase-admin')

const express = require('express')

const app = express()

app.use(express.json({ type: '*/*' }))
// app.use(express.urlencoded({ extended: true }))

app.listen(3001)
console.log('Listening on port 3001...')

const ThermalPrinter = require('node-thermal-printer').printer
const PrinterTypes = require('node-thermal-printer').types
const serviceAccount = require('./key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

const updatePrintStatus = function(ref, status) {
  const refDoc = db.doc(ref)
  refDoc.update({
    printStatus: status
  })
}

function checkFirebaseQueue(ref, order) {
  const products = order.order
  const totalNumber = order.totalNumber
  const table = order.tableNumber
  const totalPrice = order.totalPrice

  const printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://192.168.1.53'
  })

  printer.alignCenter()

  printer.bold(true)

  printer.println('Koninklijke Fanfare De Eendracht')
  printer.setTextQuadArea()
  printer.println('Vlaamse Kermis 2019')
  printer.alignLeft()
  printer.setTextNormal()
  printer.newLine()
  printer.bold(false)
  printer.println('Tafelnummer: ' + table)

  printer.drawLine()

  products.forEach(function(entry) {
    printer.tableCustom([
      { text: entry.count, align: 'LEFT', width: 0.1 },
      { text: entry.name, align: 'LEFT', width: 0.4 },
      { text: entry.unitPrice, align: 'RIGHT', width: 0.2 },
      { text: entry.totalPrice, align: 'RIGHT', width: 0.2 }
    ])
  })
  printer.drawLine()
  printer.tableCustom([
    { text: totalNumber, align: 'LEFT', width: 0.1 },
    { text: 'Totaal', align: 'LEFT', width: 0.6 },
    { text: totalPrice, align: 'RIGHT', width: 0.2 }
  ])
  printer.newLine()
  printer.drawLine()
  printer.drawLine()

  printer.cut()
  printer.execute()
  updatePrintStatus(ref, 1)
  return
}

// app.post('/', function(request, response) {
//   console.log('order', request.body)
//   start(request.body)
//   return
// })

// This checks the queue for the printer, if something changes and has printerstatus 0, change the printStatus and send to the printer
const observer = db
  .collection('orders')
  .where('printStatus', '==', 0)
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        updatePrintStatus(change.doc.ref.path, 1)
        checkFirebaseQueue(change.doc.ref.path, change.doc.data())
      }
      if (change.type === 'modified') {
        
      }
      if (change.type === 'removed') {
        
      }
    })
  })
