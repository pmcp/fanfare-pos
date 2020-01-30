# Fanfare POS

## Data

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

- Orders
  - Items
    - ID (string)
    - n (integer)
  - Client Id (string)
  - Table Id (integer)
  - Time created (timestamp)
  - Printed (bool)

  - Clients [Firebase]
    - Id (string)
    - Table Id (integer)
    - Active (bool) -> False when check is printed

- Printer [Firebase]
  - Status
  - Printer
  - OrderId
  - Print copy

## Firebase Functions
- If new order, create print copy and add to queue
- 