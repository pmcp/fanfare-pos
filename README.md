# Fanfare POS

- Hosted on Firebase
  Deploy: 
    npm run build
    npx firebase deploy

## Data Architecture

- Items [Firebase]
  - Name  (string)
  - Type  (string)
  - Price  (integer)
  - Extra (remark)
  - Printer (string)
  - Options (object)
    - Active (bool)
    - Value (array)
    - selectMultiple (bool)

- Printers [Hardcoded]

- ProductTypes [Hardcoded]

- Employee
  - name
    - first
    - last
  - orders
  
- Orders
  - Items
    - ID (string)
    - n (integer)
  - Client Id (string)
  - Table Id (integer)
  - Time created (timestamp)
  - Printed (bool)
  - Employee

  - Clients [Firebase]
    - Id (string)
    - Table Id (integer)
    - Active (bool) -> False when check is printed

- Printer [Firebase]
  - Status
  - Printer
  - OrderId
  - Print copy

- Stats
  - item
    - itemId
    - history
      - timing
      - number
    - total
      - day
        - number

## Firebase Functions
- If new order, create print copy and add to queue
- If new order, count drinks and add to stats
