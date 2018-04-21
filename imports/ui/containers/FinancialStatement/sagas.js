import { call, fork, take, cancel, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { TRIGGER_SAGA_ONE, REDUCER_ONE } from './constants';
import { acctInstance } from '../../../startup/client/ethIntegrate.js';
import axios from 'axios';

function callAPI() {
	return new Promise((resolve, reject) => {
		try {
			axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
					.then(function(response) {
						resolve(JSON.stringify(response.data));
					})
					.catch(function(cannotGetPriceErr) {
					 	reject(cannotGetPriceErr);
					})
		} catch (exception) {
			reject(exception);
		}
	});
}
export function assetClass(a){
   switch(a){
    case "A":
      return "Asset";
    case "L":
      return "Liability";
    case "E":
      return "Equity";
    case "R":
      return "Revenue";
    case "X":
      return "Expense";
    case "C":
      return "Cash";
    case "V":
      return "Receivable";
    case "P":
      return "Payable";
    case "S":
      return "Share Capital";
    case "N":
      return "Retained Earnings";

   }
}

export function * refreshStatement () {
		const ledgerUI = [];
		for (i = 0; i < acctInstance.getJournalLength(); i++) {

    const getLedger = acctInstance.getLedger(i);
    // console.log(i, getLedger);
    	const getLedgerAmount = +getLedger[0].toString();
     	const getBytes = getLedger[1].toString();

     		const AssetClass1 = yield call(hexToText, getBytes.substring(6, 8));
				const getLedgerAssetClass1 = yield call(assetClass, AssetClass1);

				const AssetClass2 = yield call(hexToText, getBytes.substring(14, 16));
				const getLedgerAssetClass2 = yield call(assetClass, AssetClass2);

				const Fsli1 = yield call(hexToText, getBytes.substring(22, 24));
				const getLedgerFsli1 = yield call(assetClass, Fsli1);

				const Fsli2 = yield call(hexToText, getBytes.substring(30, 32));
				const getLedgerFsli2 = yield call(assetClass, Fsli2);

				const getLedgerDescription = yield call(hexToText, getBytes.substring(38, getBytes.length - 4));

		ledgerUI.push({getLedgerAmount:getLedgerAmount,getLedgerAssetClass1:getLedgerAssetClass1, getLedgerAssetClass2:getLedgerAssetClass2, getLedgerFsli1:getLedgerFsli1, getLedgerFsli2:getLedgerFsli2, getLedgerDescription:getLedgerDescription})

		}
	return ledgerUI;

}
// export function * refreshStatement(){
//   const ledgerUI = [];
//   let getLedgerSum = 0;
//   let getCashSum = 0;
//   let getReceivableSum = 0;
//   let getExpenseSum = 0;
//   let getPayableSum = 0;
//   let getShareCapitalSum = 0;
//   let getRevenueSum = 0;
//   for (i=0; i<acctInstance.getJournalLength(); i++){
//
//     const getLedger = acctInstance.getLedger(i);
//     const getLedgerAmount = +getLedger[0].toString();
//
//     const getBytes = getLedger[1].toString();
//     const getLedgerAssetClass1 = this.hexToText(getBytes.substring(6,8));
//     const getLedgerAssetClass2 = this.hexToText(getBytes.substring(14,16));
//     const getLedgerFsli1 = this.hexToText(getBytes.substring(22,24));
//     const getLedgerFsli2 = this.hexToText(getBytes.substring(30,32));
//     const getLedgerDescription = this.hexToText(getBytes.substring(38,getBytes.length-4));

    // const cashAmount = +this.totalCashAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getCashSum += cashAmount;
		//
    // const receivableAmount = +this.totalReceivableAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getReceivableSum += receivableAmount;
		//
    // const payableAmount = +this.totalPayableAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getPayableSum += payableAmount;
		//
    // const expenseAmount = +this.totalExpenseAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getExpenseSum += expenseAmount;
		//
    // const shareCapitalAmount = +this.totalShareCapitalAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getShareCapitalSum += shareCapitalAmount;
		//
    // const revenueAmount = +this.totalRevenueAmount(getLedgerFsli1,getLedgerFsli2,getLedgerAssetClass1,getLedgerAmount);
    //   getRevenueSum += revenueAmount;

  // }
  // this.setState({getCashSum:getCashSum});
  // this.setState({getReceivableSum:getReceivableSum});
  // this.setState({getExpenseSum:getExpenseSum});
  // this.setState({getPayableSum:getPayableSum});
  // this.setState({getRevenueSum:getRevenueSum});
  // this.setState({getShareCapitalSum:getShareCapitalSum});
// }

// export function clickLedger(){
//   this.setState({ledgerClicked:true})
// }

// export function hexToText(hexx) {
//     var hex = hexx.toString();//force conversion
//     var str = '';
//     for (var i = 0; i < hex.length; i += 2)
//         str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//     return str;
// }

export function* immediateFunction(data) {
	// Data retrieved from the store
	const correctAnswer = yield call(callAPI);
	yield put({
		type: REDUCER_ONE,
		correctAnswer: correctAnswer,
	});
}

export function* sagaOne() {
	const watcher = yield fork(takeLatest, TRIGGER_SAGA_ONE, immediateFunction);
	yield take('CANCEL_SAGAS');
	yield cancel(watcher);
	// MUST INCLUDE: Kill all existing sagas before routing to new page
}

export default [
	sagaOne,
];
