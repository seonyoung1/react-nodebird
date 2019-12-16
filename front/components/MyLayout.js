import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const MyLayout = ({ children }) => {
	const { isLoggedIn } = useSelector(state => state.user);
	return (
		<>
			<Header />
			<div className="container">
				<div className="user_info">
					{isLoggedIn ?
						<UserProfile/> :
						<LoginForm/>
					}
				</div>
				<div className="content">
					{children}
				</div>
			</div>
			<Footer />
		</>
	);
};

MyLayout.propTypes = {
	children: PropTypes.element,
};

export default MyLayout;
