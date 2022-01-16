// contract test code will go here
const assert = require('assert') //Built in library for making assetions in testing eg: asserting one value is equal to another

const ganache = require('ganache-cli') //For building local eth test network

const Web3 = require('web3'); //By convention W is capital as web3 is a constructor, i.e. we need to create instances of web3

//We can use multiple instances of web3 to connect with multiple different eth networks

//Provider: Communication layer between web3 library and the ethereum network. Provider is like a telephone, Ganache&web3 use provider to communicate with each other
//web3 always expects a provider on config
//The provider is given by the network with which we wish to communicate;here Ganache

const web3 = new Web3(ganache.provider());
const {interface,bytecode} = require('../compile')

//The accounts that will be created using ganache will be created in an unlocked state, i.e. we wont have to seperately handle the public and private keys
//We will use web3 to access the unlocked accounts created by ganache
let getAccs;
let inbox;
let INIT_MESSAGE = 'Initial Message for contract'
beforeEach(async()=>{
    //Get a list of all unlocked accounts
    //All functions called with web3 will be asynchronous
    getAccs = await web3.eth.getAccounts()
   
   console.log("Fetched Accounts: ",getAccs)
 
    //Use one of those accounts to deploy contracts
    //This inbox object represents what will be there on the blockchain
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //Tells web3 what methods the Inbox contract has i.e. ABI
        .deploy({data: bytecode, arguments:[INIT_MESSAGE]})//Instructs web3 to deploy a new copy of this contract
        .send({from:getAccs[0], gas:'1000000'})//Instructs web3 to send a transaction that creates this contract
});

describe('Inbox',()=>{
    //Test to see if contract deployment is successful
    it('deploysContract',()=>{
        console.log("Inbox contracts: ",inbox)
        assert.ok(inbox.options.address) //ok method is used to check if the value given is undefined or not
               
    
    })
    //Test to see on initializing a default value is test
    it('initialValueTest',async ()=>{
        const message = await inbox.methods.message().call() //message() is same as getMessage(), message() is predefined if message variable is publically scoped

        assert.equal(message,INIT_MESSAGE)
    })
     //Test to see when setMEssages is called then some message is being set on the contract
     it('messageUpdateTest',async()=>{
      await inbox.methods.setMessage('New Message').send({from:getAccs[0]}) //We need to send this time as we are trying to modify data and thus it is a paid transaction
      const message = await inbox.methods.message().call()
        assert.equal(message,'New Message')
     })
})


//Mocha Test sample
// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// let car;

// beforeEach(()=>{//Will be executed before each 'it' block
//    car = new Car()
// })

// describe(
//     'CarClassTest',//Only for viewing in reports
//     ()=>{
//         it('parkFunctionTest',
//             ()=>{
//                 // const car = new Car()
//                 assert.equal(car.park(),'stopped');
//             })
//         it('driveFunctionTest',
//         ()=>{
//             // const car = new Car()
//             assert.equal(car.drive(),'vrooms') //Failed test example
//         })
//     }
//     )