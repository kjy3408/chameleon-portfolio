import { css } from "@emotion/react";

export const container = css`
width: 100px;
height: 100px;
    border: 2px solid red;
`;

export const categoryBox = css`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 80px;
    z-index: 999;
    right: 50px;
    top: 10px;
`;

export const categoryButton = (currentCategory, categoryId) => css`
    border: 1px solid #484848;
    padding: 10px;
    background-color: #121212;
    color: white;
    border-radius: 10px;
    border: ${currentCategory === categoryId ? "1px solid white": "1px solid darkgray"}; 
    box-shadow: ${currentCategory === categoryId ? '0px 0px 5px 3px white' : 'none'};

    &:hover{
        transition: all 0.4s;
        border: 1px solid white;
        box-shadow: 0px 0px 5px 3px white;
    }
`;
