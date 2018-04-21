import { call, fork, take, cancel, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { RETURN_LEDGER, REFRESH_LEDGER, INIT_STATEMENT, RETURN_STATEMENT, UPDATE_STATEMENT, REFRESH_STATEMENT } from './constants';
import axios from 'axios';

import { acctInstance } from '../../../startup/client/ethIntegrate.js';

export function hexToText(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

export function assetClass (a) {
   switch (a) {
    case 'A':
      return 'Asset';
    case 'L':
      return 'Liability';
    case 'E':
      return 'Equity';
    case 'R':
      return 'Revenue';
    case 'X':
      return 'Expense';
    case 'C':
      return 'Cash';
    case 'V':
      return 'Receivable';
    case 'P':
      return 'Payable';
    case 'S':
      return 'Share Capital';
    case 'N':
      return 'Retained Earnings';
   }
}

export function * refreshLedger () {
	const ledgerUI = [];
  var i;
	for (i = 0; i < acctInstance.getJournalLength(); i++) {

    const getLedger = acctInstance.getLedger(i);
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

		ledgerUI.push({getLedgerAmount: getLedgerAmount, getLedgerAssetClass1: getLedgerAssetClass1, getLedgerAssetClass2: getLedgerAssetClass2, getLedgerFsli1: getLedgerFsli1, getLedgerFsli2: getLedgerFsli2, getLedgerDescription: getLedgerDescription})
	}
	return ledgerUI;
}

export function * initStatement () {
  const statementUI = [];
  const init = acctInstance.initStatement(2955, 45, 1400, 100, 1500, 1900, 400); //7 arugments (cash, receivables, payables, share capital, retained_earnings, revenue, expense)

  const getBal = acctInstance.getStatementBalance();

  const cash = +getBal[0].toString();
  const receivable = +getBal[1].toString();
  const payable = +getBal[2].toString();
  const shareCapital = +getBal[3].toString();
  const retainedEarnings = +getBal[4].toString();
  const revenue = +getBal[5].toString();
  const expense = +getBal[6].toString();

  statementUI.push({cash:cash, receivable:receivable, payable:payable, shareCapital:shareCapital, retainedEarnings:retainedEarnings, revenue:revenue, expense:expense})

  return statementUI;
}

export function totalCashAmount (fsli1, fsli2, assetClass, amount) {
  if (fsli1 == 'C' || fsli2=='C') {
    if (fsli1 == 'C') {
      return +amount;
    } else {
      return -amount;
  }} else {
    return 0;
  }
}
export function totalReceivableAmount (fsli1, fsli2, assetClass, amount) {
    if (fsli1 == 'V' || fsli2=='V') {
      if (fsli1 == 'V') {
        return +amount;
      } else {
        return -amount;
    }} else {
      return 0;
    }
  }
export function totalExpenseAmount (fsli1, fsli2, assetClass, amount) {
      if (fsli1 == 'X' || fsli2=='X') {
        if (fsli1 == 'X') {
          return +amount;
        } else {
          return -amount;
      }} else {
        return 0;
      }
}
export function totalPayableAmount (fsli1, fsli2, assetClass, amount) {
      if (fsli1 == 'P' || fsli2=='P') {
        if (fsli1 == 'X') {
          return -amount;
        } else {
          return +amount;
      }} else {
        return 0;
      }
}
export function totalRevenueAmount (fsli1, fsli2, assetClass, amount) {
      if (fsli1 == 'R' || fsli2=='R') {
        if (fsli1 == 'R') {
          return -amount;
        } else {
          return +amount;
      }} else {
        return 0;
      }
}
export function totalShareCapitalAmount (fsli1, fsli2, assetClass, amount) {
      if (fsli1 == 'S' || fsli2=='S') {
        if (fsli1 == 'S') {
          return -amount;
        } else {
          return +amount;
      }} else {
        return 0;
      }
}

export function * updateStatement () {
  const sumUI = [];
  let getCashSum = 0;
  let getReceivableSum = 0;
  let getExpenseSum = 0;
  let getPayableSum = 0;
  let getShareCapitalSum = 0;
  let getRevenueSum = 0;
  var i;
  for (i = 0; i < acctInstance.getJournalLength(); i++) {
    const getLedger = acctInstance.getLedger(i);
    const getLedgerAmount = +getLedger[0].toString();
    const getBytes = getLedger[1].toString();
    const AssetClass1 = yield call(hexToText, getBytes.substring(6, 8));

    const Fsli1 = yield call(hexToText, getBytes.substring(22, 24));
    const Fsli2 = yield call(hexToText, getBytes.substring(30, 32));
    const cashAmount = yield call(totalCashAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getCashSum += cashAmount;

    const receivableAmount = yield call(totalReceivableAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getReceivableSum += receivableAmount;

    const payableAmount = yield call(totalPayableAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getPayableSum += payableAmount;

    const expenseAmount = yield call(totalExpenseAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getExpenseSum += expenseAmount;

    const shareCapitalAmount = yield call(totalShareCapitalAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getShareCapitalSum += shareCapitalAmount;

    const revenueAmount = yield call(totalRevenueAmount, Fsli1, Fsli2, AssetClass1, getLedgerAmount);
    getRevenueSum += revenueAmount;

    sumUI.push({getCashSum:getCashSum, getReceivableSum:getReceivableSum, getPayableSum:getPayableSum, getRevenueSum:getRevenueSum, getExpenseSum:getExpenseSum, getShareCapitalSum:getShareCapitalSum})
  }
  return sumUI;
}

export function * returnLedger () {
		const journal = yield call(refreshLedger);
		yield put({
			type: RETURN_LEDGER,
			journal: journal
		});
}

export function * returnStatement () {
		const statement = yield call(initStatement);
    yield put({
			type: RETURN_STATEMENT,
			statement: statement[0]
		});
}

export function * returnUpdateStatement () {
		const sum = yield call(updateStatement);
    yield put({
			type: REFRESH_STATEMENT,
			sum: sum[acctInstance.getJournalLength() - 1]
		});
}

export function * sagaUpdateStatement () {
  const watcher = yield fork(takeLatest, UPDATE_STATEMENT, returnUpdateStatement)
  yield take('CANCEL_SAGAS');
  yield cancel(watcher);
}

export function * sagaInitStatement () {
  const watcher = yield fork(takeLatest, INIT_STATEMENT, returnStatement)
  yield take('CANCEL_SAGAS');
  yield cancel(watcher);
}

export function * sagaReturnLedger () {
	const watcher = yield fork(takeLatest, REFRESH_LEDGER, returnLedger);
	yield take('CANCEL_SAGAS');
	yield cancel(watcher);
	// MUST INCLUDE: Kill all existing sagas before routing to new page
}

export default [
	sagaReturnLedger,
  sagaInitStatement,
  sagaUpdateStatement
];
