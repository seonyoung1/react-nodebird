import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../modules/reducers/post';

const PostCard = ({ post }) => {
	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const [commentText, setCommentText] = useState('');
	const {me} = useSelector(state => state.user);
	const {commentAdded, isAddingComment} = useSelector(state => state.post);
	const dispatch = useDispatch();

	const onToggleComment = useCallback(() => {
		setCommentFormOpened(prev => !prev);
	}, []);

	const onSubmitComment = useCallback((e) => {
		e.preventDefault();

	}, []);

	return (
		<div className="post">
			<p className="user">{post.User.nickname}</p>
			<p className="description">
				{post.content}
				<span className="date">{post.date}</span>
			</p>
			<div className="group">
				<button type="button" className="retweet">
					리트윗
				</button>
				<button type="button" className="like">
					좋아요
				</button>
				<button type="button" className="message">
					댓글
				</button>
				<button type="button" className="report">
					신고
				</button>
			</div>
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		User: PropTypes.object,
		content: PropTypes.string,
		img: PropTypes.string,
		createdAt: PropTypes.object,
		date: PropTypes.string,
	}),
};

export default PostCard;
