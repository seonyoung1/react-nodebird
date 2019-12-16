import React from "react";
import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const Profile = () => {
	const { isLoggedIn } = useSelector(state => state.user);

	return <div>{isLoggedIn ? <UserProfile /> : <LoginForm />}</div>;
};
export default Profile;
