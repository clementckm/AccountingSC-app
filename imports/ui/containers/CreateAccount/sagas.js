import { fork, take, cancel, put, takeLatest } from 'redux-saga/effects';
import {
	TRIGGER_SEND_ENROLMENT_EMAIL,
	SEND_EMAIL_REDUCER
} from './constants';

import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

export function * immediateFunction (data) {
	// Data retrieved from the store
	// const correctAnswer = yield call(callAPI);
	const email = data.email;
	Accounts.createUser({
		email: data.email,
		password: 'password'
	});
	// Set the subject for the enroll email
	// Accounts.sendEnrollmentEmail(userId);

	yield put({
		type: SEND_EMAIL_REDUCER,
		email
	});

	FlowRouter.go('sampleContainer');
}

export function * sagaOne () {
	const watcher = yield fork(takeLatest, TRIGGER_SEND_ENROLMENT_EMAIL, immediateFunction);
	yield take('CANCEL_SAGAS');
	yield cancel(watcher);
	// MUST INCLUDE: Kill all existing sagas before routing to new page
}

export default [
	sagaOne
];
