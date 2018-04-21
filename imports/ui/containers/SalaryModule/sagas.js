import { call, fork, take, cancel, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { UPDATE_LEDGER, EVENT_LEDGER } from './constants';
import { acctInstance } from '../../../startup/client/ethIntegrate.js';
import axios from 'axios';

export function* updateLedger(data) {
	const a = data.salary;
  const b = data.employeeName;
	const employeeOutput = data.employeeName;
	const salaryAmount = data.salary;
	const salaryArg = ["X","A","X","C",employeeOutput];
  const updateLedger = acctInstance.updateLedger(salaryAmount, salaryArg);
	yield put({
		type: EVENT_LEDGER
	});
}

export function* sagaTwo() {
	const watcher = yield fork(takeLatest, UPDATE_LEDGER, updateLedger);
	yield take('CANCEL_SAGAS');
	yield cancel(watcher);
	// MUST INCLUDE: Kill all existing sagas before routing to new page
}

export default [
	sagaTwo
];
