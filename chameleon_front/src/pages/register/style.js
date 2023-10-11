import { css } from '@emotion/react'

export const container = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 350px;
    border: 1px solid white;
    border-radius: 20px;
    background-color: #292929;
`;

export const comment = css`
    margin: auto;
    margin-top: 10px;
    width: 300px;
    display: flex;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 15px;
`;

export const mainContainer =css`
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const inputLabel = css`
    color: black;
    font-family: 'Ansungtangmyun-Bold', sans-serif;
    font-weight: 600;
    font-size: 10px;
`;

export const authInput = css`
    width: 250px ;
    height: 30px;
    background-color: #484848;
    margin-bottom: 10px;
    border-radius: 20px;
    color: white;
    padding: 10px;
    border: 1px solid darkgray;
`;

export const elseLabel = css`
    margin-top: 10px;
    color: black;
    font-family: 'Ansungtangmyun-Bold', sans-serif;
    font-weight: 600;
    font-size: 10px;
`;

export const footerContainer =css`
    margin: auto;
    display: flex;
    flex-direction: column;
`;

export const registerButton = css`
    width: 250px;
    height: 20px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    background-color: white;
    border-radius: 5px;
    font-family: 'Ansungtangmyun-Bold', sans-serif;
    font-weight: 600;
    font-size: 10px;
    
    cursor: pointer;
    &:hover {
        color: black;
        border-radius: 5px;
        font-weight: 600;
        font-size: 12px;
        border-bottom: 1px solid #fafafa;
        background-color: #fafafa;
    }
    &:active {
        color: black;
        border-radius: 5px;
        border-bottom: 1px solid #dbdbdb;
        background-color: #dbdbdb;
    }
`;

export const loginButton = css`
    margin-top: 10px;
    width: 250px;
    height: 20px;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    background-color: white;
    font-family: 'Ansungtangmyun-Bold', sans-serif;
    font-weight: 600;
    font-size: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
        font-size: 12px;
        border-bottom: 1px solid #fafafa;
        background-color: #fafafa;
    }
    &:active {
        border-radius: 5px;
        border-bottom: 1px solid #dbdbdb;
        background-color: #dbdbdb;
    }
`;

export const errorMsg = css`
    margin-left: 3px;
    margin-top: 1px;
    font-size: 10px;
    zoom: 0.7;
    color: red;
`;