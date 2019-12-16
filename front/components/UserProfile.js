import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../modules/reducers/user";

const UserProfile = () => {
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);
	const onLogout = useCallback(() => {
		dispatch({
			type: LOG_OUT_REQUEST,
		});
	}, []);
	return (
		<div className="profile">
			<p>안녕하세요. {me.nickname} 님</p>
			<ul>
				<li>짹짹 <span>{me.Post.length}</span></li>
				<li>팔로잉 <span>{me.Followings.length}</span></li>
				<li>팔로워 <span>{me.Followers.length}</span></li>
			</ul>
			<button onClick={onLogout}>로그아웃</button>
		</div>
	);
};

export default UserProfile;
