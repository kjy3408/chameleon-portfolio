import { css } from "@emotion/react";

export const container = css`
    position: relative ;
    width: 100%;
    height: 100vh;
`;

export const mainContainer = css`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export const buttonBox = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 100vh;
    color: #484848;
    font-weight: 600;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 20px;
    &:hover{
        cursor: pointer;
        font-weight: 600;
        color: white;
    }
    &:active{
        color: darkgray;
        background-color: #292929;
    }
`;
 
export const sceneStyle = css`
    width: 350px;
    height: 350px;
    position: relative;
    /* 원근감을 위해 */
    perspective: 1200px;
    perspective-origin: center -60% ;
    margin: 0 auto;
    margin-top: 100px;
`;

export const carouselStyle = css`
    width: 100%;
    height: 100%;
    position: absolute;
    /* perspective가 적용된 자식 요소들에 3D 효과 원근감*/
    transform-style: preserve-3d; 
    transition: all 0.5s;
`;
  
export const carouselCard = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 300px;
    height: 300px ;
    transition: all 0.5s;
    color: #fff;
    font-weight: bold;
    opacity: 1;
    background-color: #292929;
    border: 2px solid darkgray;
    border-radius: 20px;
`;

export const coverImgBox = css`
    width: 200px;
    height: 200px;
color: white;
    border: 1px solid white;
`;

export const memberInfoBox = css`
    width: 100%;
    height: 50px;
    font-size: 15px;
    padding: 10px;
    color: white;

    border: 1px solid white;
`;

export const titleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
`;

export const title = css`
    color: white;
`;

export const qrCodeImgBox = css`
    width: 100%;
    height: 80%;
    padding: 10px;
`;

export const qrCodeImg = css`
    width: 100%;
    height: 100%;
    &:hover{
        cursor: pointer;
        transition: all 0.4;
        position: absolute;
        top: -20%;
        left: -20%;
        width: 400px;
        height: 400px;
    }
`;

export const introductionChameleon = css`
    color: white;
`;

export const instagramIconBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &:hover{
        cursor: pointer;
    }
`;

export const instagramIcon = css`
    fill: #fafafa;
    font-size: 25px;
    margin-right: 10px;
    &:hover{
        cursor: pointer;
    }
`;

export const instagram = css`
    color: white;
    &:hover{
        cursor: pointer;
    }
`;