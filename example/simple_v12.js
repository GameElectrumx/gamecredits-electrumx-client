const ElectrumClient = require('..')

const main = async () => {
    const ecl = new ElectrumClient(50001, 'electrum.gamecredits.network', 'tls')
    await ecl.connect()
    try{
        const ver = await ecl.server_version("0", "1.2")
        console.log(ver)
        const balance = await ecl.blockchainAddress_getBalance("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(balance)
        const unspent = await ecl.blockchainAddress_listunspent("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(unspent)
        const tx1 = await ecl.blockchainTransaction_get("9fdeb7ffbadd2a529993f6e5130f0352a2d0f6afe7b6bff326535d51c19c61e7", false)
        console.log(tx1)
        const tx2 = await ecl.blockchainTransaction_get("732b88050d3e4c62e5866965030b994943a41fb01db2777c62ea4ff780eb8c8e", true)
        console.log(JSON.stringify(tx2, null, 2))
    }catch(e){
        console.log(e)
    }
    await ecl.close()
}
main().catch(console.log)
