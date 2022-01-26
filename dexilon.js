const TronWeb = require('tronweb')
const express = require('express');

const router  = express.Router();

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://127.0.0.1:8090");
const solidityNode = new HttpProvider("https://127.0.0.1:8090");
const eventServer = new HttpProvider("https://127.0.0.1:8090");
const privateKey = process.env.PRIVATE_KEY;
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

const triggerSmartContract = async (tronContractAddress) => {

    try {
        let contract = await tronWeb.contract().at(tronContractAddress);
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

router.post('/admin', async (req, res, next) => {
    const account = req.body.account;
    const response = await triggerSmartContract(account);
    return response;
   });

   const depositERC721 = async (tronContractAddress, tokenAddress, tokenId, price) => {

    try {
        let contract = await tronWeb.contract().at(tronContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result = await contract.depositERC721(tokenAddress, tokenId, price).call();
        console.log('result: ', result);
        return result;
    } catch(error) {
        console.error("deposit ERC21 smart contract function error : ", error)
        return error;
    }
}

router.post('/deposit', async (req, res, next) => {
    const {tokenAddress, tokenId, price} = req.body;
    const response = await depositERC721(tokenAddress, tokenId, price);
    return response;
   });

const withdrawERC721 = async (tronContractAddress, tokenAddress, tokenId) => {

    try {
        let contract = await tronWeb.contract().at(tronContractAddress);
        //Use call to execute a pure or view smart contract method.
        // These methods do not modify the blockchain, do not cost anything to execute and are also not broadcasted to the network.
        let result = await contract.withdrawERC721(tokenAddress, tokenId, price).call();
        console.log('result: ', result);
        return result;
    } catch(error) {
        console.error("withdraw ERC21 smart contract function error : ", error)
        return error;
    }
}

router.post('/withdraw', async (req, res, next) => {
    const {tokenAddress, tokenId, price} = req.body;
    const response = await withdrawERC721(tokenAddress, tokenId, price);
    return response;
   });



module.exports = router;