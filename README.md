Get started!

Brah! sr for the manual contract deployment process, kindly follow the instruction below:

you have to run Geth in localhost:8545 to use this app

Go to the integration part in the boilerplates ===> imports/startup/client/ethIntegrate.js

You may need to replace your geth accounts and contract address. (make sure you have ethers in your geth account)



...

web3.eth.defaultAccount = web3.eth.accounts[2];      //change your account as you wish
web3.personal.unlockAccount(web3.eth.accounts[2], 'password');          //set your password here

const contractAddress = '0x319799aee089edb07a66e32c1d02eb21372e2f16';      //replace your contract address here

...



For quick contract deployment to geth, use the web3 deployment code below(change your web3.eth.accounts if needed):

...


var browser_accounting_sol_accountingContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_index","type":"uint32"}],"name":"getLedger","outputs":[{"name":"","type":"uint8"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getJournalLength","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"statements","outputs":[{"name":"cash","type":"uint32"},{"name":"receivables","type":"uint32"},{"name":"payables","type":"uint32"},{"name":"share_capital","type":"uint32"},{"name":"retained_earnings","type":"uint32"},{"name":"revenue","type":"uint32"},{"name":"expense","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint8"},{"name":"_assetClass","type":"bytes"}],"name":"updateLedger","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getStatementBalance","outputs":[{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"journalLength","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cash","type":"uint32"},{"name":"_receivables","type":"uint32"},{"name":"_payables","type":"uint32"},{"name":"_share_capital","type":"uint32"},{"name":"_retained_earnings","type":"uint32"},{"name":"_revenue","type":"uint32"},{"name":"_expense","type":"uint32"}],"name":"initStatement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"},{"indexed":false,"name":"StatementStatus","type":"uint8"}],"name":"StatementUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"admin","type":"address"},{"indexed":false,"name":"LedgerStatus","type":"uint8"}],"name":"LedgerUpdated","type":"event"}]);
var browser_accounting_sol_accounting = browser_accounting_sol_accountingContract.new(
   {
     from: web3.eth.accounts[2],
     data: '0x60606040526000600160006101000a81548163ffffffff021916908363ffffffff1602179055506001600360006101000a81548160ff021916908360ff1602179055506001600360016101000a81548160ff021916908360ff160217905550341561006957600080fd5b610a3d806100786000396000f30060606040523615610081576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632def40bc146100865780634e594ccb146101355780639106ec721461016a5780639358b1bd14610211578063d6272b9d1461027a578063ebfe034714610321578063f07ae8ef14610356575b600080fd5b341561009157600080fd5b6100ad600480803563ffffffff169060200190919050506103d9565b604051808360ff1660ff16815260200180602001828103825283818151815260200191508051906020019080838360005b838110156100f95780820151818401526020810190506100de565b50505050905090810190601f1680156101265780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b341561014057600080fd5b6101486104c1565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561017557600080fd5b61017d6104db565b604051808863ffffffff1663ffffffff1681526020018763ffffffff1663ffffffff1681526020018663ffffffff1663ffffffff1681526020018563ffffffff1663ffffffff1681526020018463ffffffff1663ffffffff1681526020018363ffffffff1663ffffffff1681526020018263ffffffff1663ffffffff16815260200197505050505050505060405180910390f35b341561021c57600080fd5b610278600480803560ff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061057b565b005b341561028557600080fd5b61028d6106ca565b604051808863ffffffff1663ffffffff1681526020018763ffffffff1663ffffffff1681526020018663ffffffff1663ffffffff1681526020018563ffffffff1663ffffffff1681526020018463ffffffff1663ffffffff1681526020018363ffffffff1663ffffffff1681526020018263ffffffff1663ffffffff16815260200197505050505050505060405180910390f35b341561032c57600080fd5b610334610786565b604051808263ffffffff1663ffffffff16815260200191505060405180910390f35b341561036157600080fd5b6103d7600480803563ffffffff1690602001909190803563ffffffff1690602001909190803563ffffffff1690602001909190803563ffffffff1690602001909190803563ffffffff1690602001909190803563ffffffff1690602001909190803563ffffffff1690602001909190505061079c565b005b60006103e3610921565b60008060008563ffffffff1663ffffffff16815260200190815260200160002090508060000160009054906101000a900460ff1681600101808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104b05780601f10610485576101008083540402835291602001916104b0565b820191906000526020600020905b81548152906001019060200180831161049357829003601f168201915b505050505090509250925050915091565b6000600160009054906101000a900463ffffffff16905090565b60028060000160009054906101000a900463ffffffff16908060000160049054906101000a900463ffffffff16908060000160089054906101000a900463ffffffff169080600001600c9054906101000a900463ffffffff16908060000160109054906101000a900463ffffffff16908060000160149054906101000a900463ffffffff16908060000160189054906101000a900463ffffffff16905087565b610583610935565b60408051908101604052808460ff16815260200183815250905080600080600160009054906101000a900463ffffffff1663ffffffff1663ffffffff16815260200190815260200160002060008201518160000160006101000a81548160ff021916908360ff160217905550602082015181600101908051906020019061060b929190610958565b5090505060018060008282829054906101000a900463ffffffff160192506101000a81548163ffffffff021916908363ffffffff1602179055507f2ffe02a836d3601167468c98eae1d4d81d66d30f2b52da1cbc5a234ff18a62de33600360019054906101000a900460ff16604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260ff1660ff1681526020019250505060405180910390a1505050565b6000806000806000806000600260000160009054906101000a900463ffffffff16600260000160049054906101000a900463ffffffff16600260000160089054906101000a900463ffffffff166002600001600c9054906101000a900463ffffffff16600260000160109054906101000a900463ffffffff16600260000160149054906101000a900463ffffffff16600260000160189054906101000a900463ffffffff16965096509650965096509650965090919293949596565b600160009054906101000a900463ffffffff1681565b86600260000160006101000a81548163ffffffff021916908363ffffffff16021790555085600260000160046101000a81548163ffffffff021916908363ffffffff16021790555084600260000160086101000a81548163ffffffff021916908363ffffffff160217905550836002600001600c6101000a81548163ffffffff021916908363ffffffff16021790555082600260000160106101000a81548163ffffffff021916908363ffffffff16021790555081600260000160146101000a81548163ffffffff021916908363ffffffff16021790555080600260000160186101000a81548163ffffffff021916908363ffffffff1602179055507f78a883bfb3e8c84fe42c113846d14943f17736fb71ca71988ad8e5216193108633600360009054906101000a900460ff16604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260ff1660ff1681526020019250505060405180910390a150505050505050565b602060405190810160405280600081525090565b6040805190810160405280600060ff1681526020016109526109d8565b81525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061099957805160ff19168380011785556109c7565b828001600101855582156109c7579182015b828111156109c65782518255916020019190600101906109ab565b5b5090506109d491906109ec565b5090565b602060405190810160405280600081525090565b610a0e91905b80821115610a0a5760008160009055506001016109f2565b5090565b905600a165627a7a7230582084ba4d0c770c3924e1747384081371f9a3c7e9bd6155de144cf62ce77bd967a10029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })

...

Paste the code inside geth console and contracts will be deployed. Get the contract address and paste to the ethIntegrate.js.



After setting up the contract,

cd accounting-module

meteor npm install

yarn run meteorDev



App architecture:

Active Container:

Container: SalaryModule
We can create a lot of plug-in (e.g. Salary Module, Expense Module, Intangible Asset module, etc) of input source in the future and connect with the JournalEntry Container to generate journal entry and financial statement.
How to use:
- you can submit employees name (e.g. viet) and salary (e.g. 77) to the smart contract.


Container: JournalEntry
- Components: JournalEntryUi, FinancialStatementUi
This is a container built for grabbing all the journal entries and update all the numbers in the financial statement.
How to use:
- retrieve all journals by clicking refresh Ledger
- get FS by clicking first initial financial statement
- get updated FS with all journal entries, click update Financial Statement



*pls ignore all the other containers
