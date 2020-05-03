import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
	SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
	LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST
} from '../reducers/user';

// 로그인
function loginApi(loginData) {
	return axios.post('/user/login', loginData, {
		withCredentials: true, // 쿠키를 주고 받을 수 있게됨
	});
}

function* login(action) {
	try {
		const result = yield call(loginApi, action.data)
		yield put({
			type: LOG_IN_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: LOG_IN_FAILURE,
			error: e,
		});
	}
}

function* watchLogin() {
	yield takeEvery(LOG_IN_REQUEST, login);
}

// 회원가입
function signApi(signUpData) {
	return axios.post('/user', signUpData);
}

function* signUp(action) {
	try {
		yield call(signApi, action.data);
		// throw new Error('에러에러');
		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: e,
		});
	}
}

function* watchSignUp() {
	yield takeEvery(SIGN_UP_REQUEST, signUp);
}

// 로그아웃
function logOutApi() {
	return axios.post('/user/logout', {}, { // 값이 없더라도 data 에 빈객체 넣어줘야함 (post 한정)
		withCredentials: true,
	});
}

function* logOut() {
	try {
		yield call(logOutApi)
		yield put({
			type: LOG_OUT_SUCCESS
		});
	} catch (e) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: e,
		});
	}
}

function* watchLogOut() {
	yield takeEvery(LOG_OUT_REQUEST, logOut);
}


// 로드 유저
function loadUserApi() {
	return axios.get('/user', {
		withCredentials: true,
	});
}

function* loadUser() {
	try {
		const result = yield call(loadUserApi);
		yield put({
			type: LOAD_USER_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		console.error(e);
		yield put({
			type: LOAD_USER_FAILURE,
			error: e,
		});
	}
}

function* watchLoadUser() {
	yield takeEvery(LOAD_USER_REQUEST, loadUser);
}



export default function* userSaga() {
	yield all([
		fork(watchLogin),
		fork(watchSignUp),
		fork(watchLogOut),
		fork(watchLoadUser),
	]);
}
