// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider') //To configure which outside node to connect to and to unlock an account
const Web3 = require('web3')
const {interface,bytecode} = require('./compile')
const mnemonicInfo = require('./config.json')

//Infura endpoint: https://rinkeby.infura.io/v3/7d6907ac88884292876bc0495740870d
const provider = new HDWalletProvider(
    mnemonicInfo['metamaskMnemonic'],
    "https://rinkeby.infura.io/v3/7d6907ac88884292876bc0495740870d"
);
//Wherever possible try to use infura, there are also other vm tools like geth an parity that can help us acheive the same, but it is not easy to set up

const web3 = new Web3(provider);

//we are writing this function only to use async await

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts()
    console.log("List of accounts are: ",accounts)

    const result = await new web3.eth.Contract(JSON.parse(interface))
                    .deploy({data:bytecode,arguments:['Hi there this is initial message']})
                    .send({gas:'1000000',from:accounts[0]})
    
    console.log('Contract deployed to: ',result.options.address);
    provider.engine.stop() //To prevent a hanging deployment
};

deploy()

//COntract addres received after deployment: 0x451D6F5DeD500a69887A1d583848413D3D743c7D