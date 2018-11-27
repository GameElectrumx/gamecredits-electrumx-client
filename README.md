# gamecredits-electrumx-client
[![NPM](https://nodei.co/npm/gamecredits-electrumx-client.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gamecredits-electrumx-client)  
Gamecredits Electrumx Protocol Client for Node.js

## what is this

https://electrum-game.org/

Electrumx is gamecredits wallet service.  
This is a library of Node.js that can communicate with the electrum(x) server.  

## install

```
npm i gamecredits-electrumx-client
npm i gamecredits-electrumx-host-parse
```

## spec

* TCP / TLS
* JSON-RPC
* Subscribe Message
* High Performance Message
* no dependency for other library

## protocol spec

* https://electrumx.readthedocs.io/en/latest/PROTOCOL.html

## usage

```
const ElectrumCli = require('gamecredits-electrumx-client')
const main = async () => {
    const ecl = new ElectrumCli(50001, 'electrum.gamecredits.network', 'tls') // tcp or tls
    await ecl.connect() // connect(promise)
    ecl.subscribe.on('blockchain.headers.subscribe', (v) => console.log(v)) // subscribe message(EventEmitter)
    try{
        const ver = await ecl.server_version("2.7.11", "1.2") // json-rpc(promise)
        console.log(ver)
    }catch(e){
        console.log(e)
    }
    await ecl.close() // disconnect(promise)
}
main()
```

```
const ElectrumClient = require("gamecredits-electrumx-client")


const peers = require('gamecredits-electrumx-host-parse').getDefaultPeers("Gamecredits").filter(v => v.ssl)
const getRandomPeer = () => peers[peers.length * Math.random() | 0]

const main = async () => {
    const peer = getRandomPeer()
    console.log('begin connection: ' + JSON.stringify(peer))
    const ecl = new ElectrumClient(peer.ssl, peer.host, 'ssl')
    await ecl.connect()
    try{
        const ver = await ecl.server_version("1.8.7", "1.2")
        console.log(ver)
        const balance = await ecl.blockchainAddress_getBalance("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(balance)
        const unspent = await ecl.blockchainAddress_listunspent("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(unspent)
    }catch(e){
        console.log(e)
    }
    await ecl.close()
}
main().catch(console.log)
```


