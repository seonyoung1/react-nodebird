import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {LOAD_MAIN_POSTS_REQUEST} from "../modules/reducers/post";

const Index = () => {
	const { isLoggedIn } = useSelector(state => state.user);
	const { mainPosts } = useSelector(state => state.post);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: LOAD_MAIN_POSTS_REQUEST,
		})
	}, []);

	return (
		<>
			{isLoggedIn && <PostForm />}
			{mainPosts.map(c => (
				<PostCard key={c.id} post={c} />
			))}
		</>
	);
};

export default Index;
