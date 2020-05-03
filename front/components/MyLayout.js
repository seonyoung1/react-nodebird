import React, { useEffect } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Footer from './Footer';
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import {LOAD_USER_REQUEST} from "../modules/reducers/user";

const MyLayout = ({ children }) => {
	const { isLoggedIn, me } = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if( !me ){
			dispatch({
				type: LOAD_USER_REQUEST,
			})
		}
	}, []);

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
