const TronWeb = require('tronweb')
const express = require('express');

const router  = express.Router();

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://127.0.0.1:8090");
const solidityNode = new HttpProvider("https://127.0.0.1:8090");
const eventServer = new HttpProvider("https://127.0.0.1:8090");
const privateKey = "your private key";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

const triggerSmartContract = async (trc20ContractAddress) => {

    try {
        let contract = await tronWeb.contract().at(trc20ContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result = await contract.owner().call();
        console.log('result: ', result);
        return result;
    } catch(error) {
        console.error("trigger smart contract error",error)
        return error;
    }
}

outer.post('/admin', async (req, res, next) => {
    const account = req.body.account;
    const response = await triggerSmartContract(account);
    return response;
   });