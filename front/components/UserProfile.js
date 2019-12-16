import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../modules/store/user";

const UserProfile = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);
	const onLogout = useCallback(() => {
		dispatch(logoutAction);
	}, []);
	return (
		<div>
			<p>안녕하세요. {user.nickname} 님</p>
			<button onClick={onLogout}>로그아웃</button>
		</div>
	);
};

export default UserProfile;
