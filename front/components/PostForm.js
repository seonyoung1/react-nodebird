import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from "../modules/reducers/post";

const PostForm = () => {
    const dispatch = useDispatch();
	const [text, setText] = useState('');
	const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);

	useEffect(() => {
	    if(postAdded){
	        setText('');
        }
    }, [postAdded]);

	const onSubmitForm = useCallback(e => {
	    e.preventDefault();
	    dispatch({
            type: ADD_POST_REQUEST,
            data: {
                text,
            }
        })
    }, []);

	const onChangeText = useCallback(e => {
	    setText(e.target.value);
    }, []);

	return (
		<div className="post_form">
			<form encType="multipart/form-data" onSubmit={onSubmitForm}>
                <div className="upload">
                    <textarea placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
                    <div className="file">
                        <label htmlFor="upload" className="button">이미지업로드</label>
                        <input type="file" multiple id="upload" />
                    </div>
                    <button type="submit">짹짹</button>
                </div>
                <div className="image_list">
                    {imagePaths.map(v => (
                        <div key={v}>
                            <img src={``} alt={v} />
                            <div>
                                <button>remove</button>
                            </div>
                        </div>
                    ))}
                </div>
			</form>
		</div>
	);
};

export default PostForm;
