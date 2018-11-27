const ElectrumClient = require("..")


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
