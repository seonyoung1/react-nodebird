import React from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Index = () => {
	const { isLoggedIn } = useSelector(state => state.user);
	const { mainPosts } = useSelector(state => state.post);

	return (
		<>
			{isLoggedIn && <PostForm />}
			{mainPosts.map(c => (
				<PostCard key={c} post={c} />
			))}
		</>
	);
};

export default Index;
