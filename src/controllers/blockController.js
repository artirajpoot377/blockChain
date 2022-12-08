const coinModel = require("../Models/blockchainModel")
const axios = require("axios")

const getBlockdata = async function (req, res) {
    try {
        var options = {
            method: 'get',
            url: 'http://api.coincap.io/v2/assets',
            Headers: {
                'Authorization': 'Bearer 3a982a94-e418-4d75-a00c-9065e1a04ba5'
            }
        }
        let result = await axios(options)
        //console.log(result);
        let resultData = result.data

        for (let i = 0; i < resultData.data.length; i++) {
            let data = {}
            data.symbol = resultData.data[i].symbol
            data.name = resultData.data[i].name
            data.marketCapUsd = resultData.data[i].marketCapUsd
            data.priceUsd = resultData.data[i].priceUsd
            let createData = await coinModel.findOneAndUpdate(
                { $and: [{ symbol: data.symbol }, { name: data.name }] },
                {
                    symbol: data.symbol,
                    name: data.name,
                    marketCapUsd: data.marketCapUsd,
                    priceUsd: data.marketCapUsd
                },
                { upsert: true }
            )
        }
        let sortedData = resultData.data.sort(function (a, b) { return b.changePercent24Hr - a.changePercent24Hr })
        res.send({ msg: sortedData })

    } 
    catch (err) {
        //console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getBlockdata = getBlockdata


