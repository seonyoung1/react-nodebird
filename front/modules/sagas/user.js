import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';

function loginApi() {
	return axios.post('/login');
}

function* login() {
	try {
		// yield call(loginApi);
		yield delay(2000);
		yield put({
			type: LOG_IN_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: LOG_IN_FAILURE,
		});
	}
}

function* watchLogin() {
	yield takeEvery(LOG_IN_REQUEST, login);
}

function signApi() {
	return axios.post('/login');
}

function* signUp() {
	try {
		// yield call(signApi);
		yield delay(2000);
		// throw new Error('에러에러');
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: SIGN_UP_FAILURE,
		});
	}
}

function* watchSignUp() {
	yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
	yield all([fork(watchLogin), fork(watchSignUp)]);
}
