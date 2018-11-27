const Client = require("..")

const proc = async(cl) => {
    try{
        const version = await cl.server_version("1.8.7", "1.2")
        console.log(version)
        const balance = await cl.blockchainAddress_getBalance("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(balance)
        const utxo = await cl.blockchainAddress_listunspent("Gftmt8hgzgNu6f1o85HMPuwTVBMSV2TYSt")
        console.log(utxo)
    }catch(e){
        console.log(e)
    }
}

const main = async(port, host) => {
    const cl = new Client(port, host);
    await cl.connect()
    for(let i = 0; i<100; ++i){
        await proc(cl)
    }
    await cl.close()
}

main(666, "localhost")
