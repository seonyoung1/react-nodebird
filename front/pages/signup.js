import React, { useEffect, useCallback, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks';
import { SIGN_UP_REQUEST } from '../modules/reducers/user';

const SignUp = () => {
	const [id, onChangeId] = useInput('');
	const [nick, onChangeNick] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordChk, setPasswordChk] = useState('');
	const [term, setTerm] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [termError, setTermError] = useState(false);
	const dispatch = useDispatch();
	const { me, isSigningUp, isSignedUp, signUpErrorReason } = useSelector(state => state.user);

	useEffect(() => {
		if (me) {
			alert('로그인 되었습니다. 메인페이지로 이동합니다.');
			Router.push('/');
		}
	}, [me && me.id]);

	useEffect(() => {
		if (isSignedUp) {
			alert('회원가입에 성공했습니다. 메인페이지로 이동합니다.');
			Router.push('/');
		}
	}, [isSignedUp]);

	const onSubmit = useCallback(
		e => {
			e.preventDefault();
			if (password !== passwordChk) {
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}
			// console.log({ id, nick, password, passwordChk, term });
			dispatch({
				type: SIGN_UP_REQUEST,
				data: {
					userId: id,
					password,
					nickname: nick,
				},
			});
		},
		[id, nick, password, passwordChk, term],
	);

	const onChangePasswordChk = useCallback(
		e => {
			setPasswordError(e.target.value !== password);
			setPasswordChk(e.target.value);
		},
		[password],
	);

	const onChangeTerm = useCallback(e => {
		setTermError(false);
		setTerm(e.target.checked);
	}, []);

	return (
		<div className="sign">
			<form onSubmit={onSubmit}>
				<h1>회원가입</h1>
				<div className="cell">
					<label htmlFor="user-id">아이디</label>
					<input type="text" name="user-id" value={id} onChange={onChangeId} />
				</div>
				<div className="cell">
					<label htmlFor="user-nick">닉네임</label>
					<input type="text" name="user-nick" value={nick} onChange={onChangeNick} />
				</div>
				<div className="cell">
					<label htmlFor="user-pass">비밀번호</label>
					<input type="password" name="user-pass" value={password} onChange={onChangePassword} />
				</div>
				<div className="cell">
					<label htmlFor="user-pass-chk">비밀번호확인</label>
					<input type="password" name="user-pass-chk" value={passwordChk} onChange={onChangePasswordChk} />
				</div>
				<div className="agree">
					<input type="checkbox" name="user-term" onChange={onChangeTerm} defaultChecked={term} />
					<label htmlFor="user-term">동의합니다.</label>
				</div>
				<div className="cell error">
					{passwordError && <p>비밀번호가 일치하지 않습니다</p>}
					{termError && <p>약관에 동의해주세요</p>}
				</div>
				<div className="cell group">
					<button type="submit">{isSigningUp?"가입하는중..":"가입하기"}</button>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
