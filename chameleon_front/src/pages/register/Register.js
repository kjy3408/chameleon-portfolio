/** @jsxImportSource @emotion/react */
import axios from 'axios';
import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();

    const [ registerUser, setRegisterUser ] = useState({email:"", password:"", checkPassword: "", name:""})
    const [ errorMessages, setErrorMessages ] = useState({email: "", password: "", name: ""});

    const onChangeInputHandle = (e) => {
        const { name, value } = e.target;
        setRegisterUser({...registerUser, [name]: value});
    }

    const submitRegisterHandle = async () => {
        const data = {
            ...registerUser
        }
        const option = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            await axios.post(`http://localhost:8080/auth/signup`, JSON.stringify(data), option);
            navigate("/auth/login");
        } catch(error) {
            setErrorMessages({email: "", password: "", name: "", ...error.response.data.errorData});
        }
    }

    const onClickLoginButton = () => {
        navigate("/auth/login");
    }

    const onEnterKeyUp = (e) => {
        if(e.keyCode === 13) {
            submitRegisterHandle();
        }
    }

    return (
        <div css={s.container} onKeyUp={onEnterKeyUp}>
            <div css={s.comment}>회원가입</div>

            <main css={s.mainContainer}>
                <input css={s.authInput} type="email" onChange={onChangeInputHandle} name="email" placeholder='아이디'/>
                <div css={s.errorMsg}>{errorMessages.email}</div>

                <input css={s.authInput} type="password" onChange={onChangeInputHandle} name="password" placeholder='비밀번호'/>
                <div css={s.errorMsg}>{errorMessages.password}</div>

                <input css={s.authInput} type="password" onChange={onChangeInputHandle} name="checkPassword" placeholder='비밀번호 확인'/>
                <div css={s.errorMsg}>{errorMessages.password}</div>

                <input css={s.authInput} type="text" onChange={onChangeInputHandle} name="name" placeholder='닉네임'/>
                <div css={s.errorMsg}>{errorMessages.name}</div>
            </main>

            <footer css={s.footerContainer}>
                <button css={s.registerButton} onClick={submitRegisterHandle}>회원가입</button>
                <button css={s.loginButton} onClick={onClickLoginButton}>로그인</button>
            </footer>
        </div>
    );
};

export default Register;