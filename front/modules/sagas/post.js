import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	LOAD_MAIN_POSTS_SUCCESS, LOAD_MAIN_POSTS_FAILURE, LOAD_MAIN_POSTS_REQUEST
} from '../reducers/post';

function addPostApi(postData) {
	return axios.post('/post', postData, {
		withCredentials: true,
	})
}

function* addPost(action) {
	try {
		const result = yield call(addPostApi, action.data);
		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: ADD_POST_FAILURE,
			error: e,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentApi() {}

function* addComment(action) {
	try {
		yield delay(2000);
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: {
				postId: action.data.postId,
			},
		});
	} catch (e) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: e,
		});
	}
}

function* watchComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadMainPostApi() {
	return axios.get('/posts')
}

function* loadMainPost(action) {
	try {
		const result = yield call(loadMainPostApi, action.data);
		yield put({
			type: LOAD_MAIN_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (e) {
		yield put({
			type: LOAD_MAIN_POSTS_FAILURE,
			error: e,
		});
	}
}

function* watchLoadMainPost() {
	yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPost);
}

export default function* postSaga() {
	yield all([
	    fork(watchAddPost),
        fork(watchComment),
		fork(watchLoadMainPost)
    ]);
}
