import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE } from '../reducers/post';

function addPostApi() {}

function* addPost() {
	try {
		yield delay(2000);
		yield put({
			type: ADD_POST_SUCCESS,
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

export default function* postSaga() {
	yield all([
	    fork(watchAddPost),
        fork(watchComment)
    ]);
}
