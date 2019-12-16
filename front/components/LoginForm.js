import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks';
import { LOG_IN_REQUEST } from '../modules/reducers/user';

const LoginForm = () => {
	const [id, onChangeId] = useInput('');
	const [password, onChangePassword] = useInput('');
	const { isLoggingIn } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			dispatch({
				type: LOG_IN_REQUEST,
				data: {
					id,
					password,
				},
			});
		},
		[id, password],
	);

	return (
		<form onSubmit={onSubmit}>
			<h1>로그인</h1>
			<div className="cell">
				<label htmlFor="userId">아이디</label>
				<input type="text" name="userId" value={id} onChange={onChangeId} />
			</div>
			<div className="cell">
				<label htmlFor="userPassword">비밀번호</label>
				<input type="password" name="userPassword" value={password} onChange={onChangePassword} />
			</div>
			<div className="cell group">
				<button type="submit">로그인</button>
			</div>
			<p>
				아이디가 없으십니까?
				<Link href="/signup"><a>회원가입</a></Link>
			</p>
		</form>
	);
};

export default LoginForm;
