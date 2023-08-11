DOING
- Set back the IP of printer to .1.72 (use app: EpsonNet Config)

TODO
- afrekening knop optioneel maken (want weg voor vlaamse kermis)
- betere account login flow
- Openstaande rekeningen rangschikken op opvolgende tafel volgorde
- Uur stond niet goed op het afgeprinte blaadje
- Tafel en nummers kunnen veranderen
- Tafel naam en nummer groter printen
- Extra veldje voor naam (apart van tafelnummer)
- volgorde veranderen van producten werkt niet goed
- Opmerking op papiertje groter zetten (in vet)
- Printers page om printers in te stellen

**Voor eetfestijn 2024**
- Afrekening niet tonen aan opnemers, wel aan "admin" (twee rollen: kassa + opnemers)
- aanpasbaar van afrekening (voor af te printen)
  - Bij afrekening: openen in bestel view, alle bestellingen ingevuld, bestel (enkel afprint bij Rudy)


Wifi?: teltonika+rut950

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
  - wifi = Friendly Network - kinggiorgiomaharadja
- ssh pi@ IP adresss
- Server files are in cd ~/Documents/firebase-pos-server

Handleiding
- Eerst printers opstarten: als blauw lichtje brandt: ok.
- Router opstarten (Netgear)
  - Hou knop aan de zijkant enkele ingedrukt, tot de modem opstart.
- Dan Raspberry Pi insteken
