POST MORTEM EETFESTIJN
- Probleem: drie printers bekabeld, 1tje netwerkkabel was connectie verloren
  - Oplossing:
    - Checken if printer is connected, waarschuwing 
    - Checken if message is printed
    - View na bestelling: all is printed
    -   https://github.com/Klemen1337/node-thermal-printer
- Afrekening niet tonen aan opnemers, wel aan "admin" (twee rollen: kassa + opnemers)
  - afrekening knop optioneel maken (want weg voor vlaamse kermis)
  - Titel instelbaar
- betere account login flow

- Openstaande rekeningen rangschikken op opvolgende tafel volgorde
- Uur stond niet goed op het afgeprinte blaadje
- Tafel en nummers kunnen veranderen
- Tafel naam en nummer groter printen
- Extra veldje voor naam (apart van tafelnummer)
- volgorde veranderen van producten werkt niet goed

- Opmerking op papiertje groter zetten (in vet)



**Voor eetfestijn 2024**
- aanpasbaar van afrekening (voor af te printen)
  - Bij afrekening: openen in bestel view, alle bestellingen ingevuld, bestel (enkel afprint bij Rudy)


Wifi: teltonika+rut950


DOING
- Set back the IP of printer to .1.72 (use app: EpsonNet Config)

TODO
- Add orders to an event?
- Watch event on printers

INFO
Start dev:
- For now use nvm 16

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
