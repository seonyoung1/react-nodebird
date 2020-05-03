import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../modules/reducers/post';

const PostCard = ({ post }) => {
	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const [commentText, setCommentText] = useState('');
	const { me } = useSelector(state => state.user);
	const { commentAdded, isAddingComment } = useSelector(state => state.post);
	const dispatch = useDispatch();

	const onToggleComment = useCallback(() => {
		setCommentFormOpened(prev => !prev);
	}, []);

	const onSubmitComment = useCallback(e => {
		e.preventDefault();
		if (!me) {
			return alert('로그인이 필요합니다.');
		}
		return dispatch({
			type: ADD_COMMENT_REQUEST,
			data: {
				postId: post.id,
			}
		})
	}, [me && me.id]);

	useEffect(() => {
		setCommentText('');
	}, [commentAdded === true]);

	const onChangeCommentText = useCallback((e) => {
		setCommentText(e.target.value);
	}, []);

	return (
		<div className="post">
			<div className="login_info">
				<p className="retweet_msg">{/*님이 리트윗 하셨습니다.*/}</p>
				<button type="button">팔로우</button>
			</div>
			<div className="inner">
				{post.img &&
					<img src={post.img} alt="" />
				}
				<div className="box">
					<p className="user">
						닉네임
						{/*{console.log(post.User.nickname !== null ? post.User.nickname : '')}*/}
						{/*{post.User.nickname !== null ? post.User.nickname : ''}*/}
						<span className="date">{post.date}</span>
					</p>
					<p className="desc">
						{post.content}
					</p>
				</div>

				<div className="group">
					<button type="button" className="retweet">
						리트윗
					</button>
					<button type="button" className="like">
						좋아요
					</button>
					<button type="button" className="message" onClick={onToggleComment}>
						댓글
					</button>
					<button type="button" className="report">
						신고
					</button>
				</div>
			</div>
			{commentFormOpened && (
				<div className="comment">
					<form onSubmit={onSubmitComment} className="comment_box">
						<textarea value={commentText} onChange={onChangeCommentText} />
						<button type="submit">{isAddingComment ? "삐약삐약삐약" : "삐약"}</button>
					</form>
					<ul className="comment_list">
						{post.Comments.map(item =>
							<li key={item}>
								<p className="name">{item.User.nickname}</p>
								<p className="desc">{item.content}</p>
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		User: PropTypes.object,
		content: PropTypes.string,
		img: PropTypes.string,
		createdAt: PropTypes.string,
		date: PropTypes.string,
		id: PropTypes.number,
		Comments: PropTypes.array,
	}),
};

export default PostCard;
