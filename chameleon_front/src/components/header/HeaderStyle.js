import { css } from "@emotion/react";

export const contaier = css`
    position: fixed;   
    display: flex;
    align-items: center;
    top: 0;
    width: 100%;
    height: 100px;
    z-index: 999;
    background-color: #121212;
`;

export const menuButtonBox = css`
    display: flex;
    align-items: center;
    position: absolute;
    top: 35px;
    left: 70px;
    width: 50px;
    height: 40px;
    color: white;
`;

export const menuButton = css`
    width: 50px;
    height:40px;
    border: 1px solid darkgray;
    background-color: #292929;
    border-radius: 10px;
    color: white;
    &:hover{
        border: 1px solid white;
        box-shadow: 0px 0px 5px 0px white;
        font-weight: 600;
    }
`;

export const menuButtonIcon = css`
    fill: #fafafa;
    font-size: 20px;
`;

export const pageTitleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    margin: auto;
    &:hover{
        cursor: pointer;
    }
`;

export const titleIconBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    &:hover{
        cursor: pointer;
    }
`;

export const titleIcon = css`
    position: absolute;
    top: 25px;
    font-size: 60px;
    &:hover{
        cursor: pointer;
    }
`;

export const titleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    height: 60px;
    &:hover{
        cursor: pointer;
    }
`;

export const title = css`
    font-size: 40px;
    &:hover{
        cursor: pointer;
    }
`;

export const miniTitleBox = css`
    width: 30px;
    height: 40px;
    margin-top: 10px;
    &:hover{
        cursor: pointer;
    }
`;

export const menuContainer = (menuIsOpen) => css`
    width: 100px;
    /* height: 500px; */
    position: absolute;
    top: 100px;
    background-color: #2A2A2B;
    box-shadow: 0px 0px 5px 0px white;
    transition: all 0.4s ease-in-out;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    left: ${menuIsOpen ? "-70px" : "-302px"};
`;

export const menuButtonsBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    /* border: 1px solid white; */
`;

export const menuButtons = css`
    width: 80px;
    height: 30px;
    background-color: #2F313E;
    color: darkgray;
    border-radius: 20px;
    border: 1px solid darkgray;
    
    &:hover{
        cursor: pointer;
        border: 1px solid white;
        box-shadow: 0px 0px 5px 1px #A6D6FE;
        color: white;
        font-weight: 600;

    }
`;

