/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedState } from '../../atoms/Auth/AuthAtom';
import AuthInput from '../../components/auth/AuthInput'
import * as s from './style';

const Login = () => {
    const [ loginUser, setLoginUser ] = useState({email: "", password: ""});
    const [ errorMessages, setErrorMessages ] = useState({email: "", password: ""});
    const [ refresh, setRefresh ] = useRecoilState(authenticatedState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    }

    const noLoginHandle = () => {
        window.location.href = "http://localhost:3000/"
    }

    const loginHandleSubmit = async () => {
        console.log("?")
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post(`http://localhost:8080/auth/login`, JSON.stringify(loginUser), option);

            localStorage.setItem("accessToken", response.data);
            setRefresh(true);
            window.location.href = "/"
        } catch(error) {
            setErrorMessages({email: "", password: "", ...error.response.data.errorData});
        }
    }
    
    const loginEnterKeyup = (e) => {
        if(e.keyCode === 13) {
            loginHandleSubmit();
        }
    }

    const googleAuthHandleClick = () => {
        window.location.href = `http://localhost:8080/oauth2/authorization/google`
    }

    const registerHandleClick = () => {
        navigate("/auth/register");
    }


    return (
        <div css={s.container} onKeyUp={loginEnterKeyup}>

            <div css={s.comment}>Login</div>

            <main css={s.mainContainer}>
                <div css={s.errorMsg}>{errorMessages.email}</div>
                <input css={s.authInput} type="email" placeholder='아이디' onChange={handleChange} name="email" />

                <input css={s.authInput} type="password"  placeholder='비밀번호' onChange={handleChange} name="password" />
            </main>
            <footer css={s.footerContainer}>
                <button onClick={loginHandleSubmit} css={s.loginButton}>로그인</button>
                <button onClick={noLoginHandle} css={s.noLoginButton}>로그인 없이 둘러보기</button>

                <button css={s.googleLoginButton} onClick={googleAuthHandleClick}>
                    <div css={s.iconStyle}>
                        <FcGoogle/>
                    </div>
                    <div css={s.buttonLabel}>
                        Google 로그인
                    </div>
                </button>
                <button css={s.registerButton} onClick={registerHandleClick}>회원가입</button>
                <button css={s.findInfo}><Link to="/auth/findemail">이메일 찾기</Link> / <Link to="/auth/findpassword">비밀번호 찾기</Link></button>
            </footer>
        </div>
    );
};

export default Login;