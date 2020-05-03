import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../modules/reducers/post';

const PostForm = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
	const { me } = useSelector(state => state.user);

	useEffect(() => {
		if (postAdded) {
			setText('');
		}
	}, [postAdded === true]);

	const onSubmitForm = useCallback(e => {
		e.preventDefault();
		if( !text || !text.trim() ){
			return alert('내용을 입력해주세요');
		}
		dispatch({
			type: ADD_POST_REQUEST,
			data: {
				content: text.trim(),
				User: {
					userId : me.userId,
					nickname: me.nickname,
				}
			},
		});
	}, [text]);

	const onChangeText = useCallback(e => {
		setText(e.target.value);
	}, []);

	return (
		<div className="post_form">
			<form encType="multipart/form-data" onSubmit={onSubmitForm}>
				<div className="upload">
					<textarea placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
					<div className="file">
						<label htmlFor="upload" className="button">
							이미지업로드
						</label>
						<input type="file" multiple id="upload" />
					</div>
					<button type="submit">{isAddingPost ? '짹짹 짹짹짹' : '짹짹'}</button>
				</div>
				<div className="image_list">
					{imagePaths.map(v => (
						<div key={v}>
							<img src={`http://localhost:3065/${v}`} alt={v} />
							<div>
								<button>제거</button>
							</div>
						</div>
					))}
				</div>
			</form>
		</div>
	);
};

export default PostForm;
