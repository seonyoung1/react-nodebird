import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import Footer from "./Footer";

const dummy = {
	isLoggedIn: false,
	user: "",
};

const MyLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div id="container">
				{dummy.isLoggedIn && <div>안녕하세요. {dummy.user}님! 오늘도 좋은 하루 보내세요!!</div>}
				{children}
			</div>
			<div className="loading"></div>
			<Footer />
		</>
	);
};

MyLayout.propTypes = {
	children: PropTypes.element,
};

export default MyLayout;
