import React from 'react';
import { useSelector } from 'react-redux';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
	const { isLoggedIn } = useSelector(state => state.user);
	return (
		<>
			{isLoggedIn ? (
				<>
					<NicknameEditForm />
					<h2>팔로잉 목록</h2>
					<ul className="profile_list">
						<li>
							사람1 <button>언팔로우</button>
						</li>
					</ul>
					<h2>팔로워 목록</h2>
					<ul className="profile_list">
						<li>
							사람1 <button>언팔로우</button>
						</li>
					</ul>
					<h2>내 글 목록</h2>
				</>
			) : (
				'로그인을 해주세요'
			)}
		</>
	);
};
export default Profile;
