import { call, fork, take, cancel, put, takeLatest } from 'redux-saga/effects';
import { TRIGGER_SAGA_ONE, REDUCER_ONE } from './constants';
import axios from 'axios';

function callAPI () {
	return new Promise((resolve, reject) => {
		try {
			axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR')
					.then(function (response) {
						resolve(JSON.stringify(response.data));
					})
					.catch(function (cannotGetPriceErr) {
						reject(cannotGetPriceErr);
					});
		} catch (exception) {
			reject(exception);
		}
	});
}
export function * immediateFunction (data) {
	// Data retrieved from the store
	const correctAnswer = yield call(callAPI);
	yield put({
		type: REDUCER_ONE,
		correctAnswer
	});
}

export function * sagaOne () {
	const watcher = yield fork(takeLatest, TRIGGER_SAGA_ONE, immediateFunction);
	yield take('CANCEL_SAGAS');
	yield cancel(watcher);
	// MUST INCLUDE: Kill all existing sagas before routing to new page
}

export default [
	sagaOne
];
