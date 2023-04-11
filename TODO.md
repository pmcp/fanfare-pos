POSTMORTEM EETFESTIJN
- Probleem: drie printers bekabeld, 1tje netwerkkabel was connectie verloren
  - Oplossing:
    - Checken if printer is connected, waarschuwing 
    - Checken if message is printed
    - View na bestelling: all is printed
- Afrekening niet tonen aan opnemers, wel aan "admin"
  - afrekening knop optioneel maken (want weg voor vlaamse kermis)
  - Titel instelbaar



Wifi: teltonika+rut950


DOING

TODO
- Add view for final check
- Sync to excel via zapier
- Printer beheer erin steken ( kies locatie - print test )
- Melding dat ok bij verstuur
- Terugkoppeling bestelling - verstuurd - printed
- Filmpje maken voor installatie


OLD
- Add remark for ordering + printing
- Clean up ordering form
- How to handle users   (waiters)?
- Add place to fill in printer (IP etc)
- Fix service account shizzle (disabled for now)
- Add printers to mobile vikings
- Fix login flow (or remove)
- What if a printer is out?

INFO
Login Epson printer:
- Go to ip (that comes out of printer)
- Login: epson - epson

Login Netgear:
- http://m1login.net
- Login: admin - kinggiorgiomaharadja
- pin: 1111

Raspberry:
- To find ip: ping raspberrypi
- login: pi - pmcppaulmcparty
  - wifi = Friendly Network
- ssh pi@ IP adresss
- Server files are in ~/Documents/firebase-pos-server
§

Handleiding
- Eerst printers opstarten: als blauw lichtje brandt: ok.
- Router opstarten (Netgear)
  - Hou knop aan de zijkant enkele ingedrukt, tot de modem opstart.
- Dan Raspberry Pi insteken
