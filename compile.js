// compile code will go here

//Read contents of sol file as they cannot be imported directly using 'require' as 'require' will expect a js file

const path = require('path') //Path module guarantees cross platform compatibility, otherwise it can cause probs in other os
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol') //__dirname will take us from root directory to current woring directory

const source = fs.readFileSync(inboxPath,'utf8') //Get source code from the sol file


module.exports = solc.compile(source,1).contracts[':Inbox']; //2nd arg is no. of contracts we are trying to compile

//Why do we have :Inbox and not Inbox
// This is beacause in this case we have directly given the source code. However, if in case we had given a path to a file that contained the contract source code
//Then it would have been 'Filewithcontract:Inbox' instead of ':Inbox'

// console.log(solc.compile(source,1)) //View the compiled output


//Next we use the ABI(interface) and bytecode obtained on compiling

