var web3 = require('web3');

const acctABI = [{"constant":true,"inputs":[{"name":"_index","type":"uint32"}],"name":"getLedger","outputs":[{"name":"","type":"uint8"},{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getJournalLength","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"statements","outputs":[{"name":"cash","type":"uint32"},{"name":"receivables","type":"uint32"},{"name":"payables","type":"uint32"},{"name":"share_capital","type":"uint32"},{"name":"retained_earnings","type":"uint32"},{"name":"revenue","type":"uint32"},{"name":"expense","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint8"},{"name":"_assetClass","type":"bytes"}],"name":"updateLedger","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getStatementBalance","outputs":[{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"},{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"journalLength","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_cash","type":"uint32"},{"name":"_receivables","type":"uint32"},{"name":"_payables","type":"uint32"},{"name":"_share_capital","type":"uint32"},{"name":"_retained_earnings","type":"uint32"},{"name":"_revenue","type":"uint32"},{"name":"_expense","type":"uint32"}],"name":"initStatement","outputs":[],"payable":false,"type":"function"}]

var ethHost = "http://127.0.0.1:8545"
web3 		= new Web3(new Web3.providers.HttpProvider(ethHost));

//set default Account
web3.eth.defaultAccount = web3.eth.accounts[2];
web3.personal.unlockAccount(web3.eth.accounts[2], 'password');

// const contractAddress = '0x319799aee089edb07a66e32c1d02eb21372e2f16';
const contractAddress = '0x5554188553809d3f5ebd49eb99776465504fe37a';
const acctContract = web3.eth.contract(acctABI);
export const acctInstance = acctContract.at(contractAddress);
 // 
 // var events = acctInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
 // console.log(events);
 //
 // events.watch(function(error, event){
 // if (!error)
 // console.log(JSON.stringify(event.data));
 // console.log(JSON.stringify(event.blockNumber));
 // });
 //
 // var number = web3.eth.blockNumber;
 // console.log(number);
