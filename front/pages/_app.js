import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import reducer from '../modules/reducers';
import rootSaga from '../modules/sagas';
import MyLayout from '../components/MyLayout';
import '../public/styles/common.scss';

const MyApp = ({ Component, pageProps, store }) => (
	<div id="wrapper">
		<Provider store={store}>
			<Head>
				<title>Node Bird</title>
			</Head>
			<MyLayout>
				<Component {...pageProps} />
			</MyLayout>
		</Provider>
	</div>
);

MyApp.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.object,
	store: PropTypes.object,
};

MyApp.getInitialProps = async context => {
	// console.log(context);
	const { ctx, Component } = context;
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	return { pageProps };
};

const configureStore = (initialState, options) => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middlewares))
			: compose(applyMiddleware(...middlewares), !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
	const store = createStore(reducer, initialState, enhancer);
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

export default withRedux(configureStore)(withReduxSaga(MyApp));
