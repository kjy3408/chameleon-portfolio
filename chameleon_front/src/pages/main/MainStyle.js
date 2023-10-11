import { css } from "@emotion/react";

export const container = css`
    width: 100%;
    height: 100vh;
    overflow: auto;
      
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export const mainContainer = css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 150px;
    
    ::-webkit-scrollbar {
        width: 0px; 
    }
`;

export const nicknameBox = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const nickname = css`
    color: white;
    font-weight: 600;
`;

export const playListContainer = css`
    position: fixed;
    top: 152px;
    left: 10px;
    width: 250px;
    height: 300px;
    border: 4px solid darkgray;
    border-radius: 20px;
    background-color: #121212;
    
    overflow: auto;
    ::-webkit-scrollbar {
        width: 0px; 
    }
`;

export const playListTitleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 246px;
    height: 30px;
    border-bottom: 4px solid darkgray;
`;

export const playListTitle = css`
    color: darkgray;
    font-weight: 600;
`;

export const playListBox = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
`;

export const videoListBox = css`
    display: flex;
    align-items: center;
    /* text-align: center; */
    width: 90%;
    height: 30px;
    /* padding: 10px; */
    /* border: 1px solid white; */
    background: linear-gradient(to left, #121212, #485959);
    margin-bottom: 2px;
    &:hover {
        box-shadow: 0px 0px 5px 3px white;
    }
`;

export const playListIcon = css`
    fill: white;
    width: 15px;
    height: 15px;
`;

export const playListVideoTitle = css`
    color: white;
    margin-left: 10px;
    height: 30px;
    margin-top: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: calc(100% - 25px); 
`;

export const playListPlayVideoBox = css`
    position: fixed;
    top: 200px;
    height: 200px;
    width: 300px;
    height: 300px;
    background-color: #121212;
    border: 1px solid white;
`;

export const videoTitleBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 15px;
    /* border: 1px solid white; */
`;

export const videoTitle = css`
    color: white;
    font-weight: 600;
`;

export const videoBox = css`
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid white;
    margin: 0px 0px 30px 0px;
    border-radius: 20px;
`;

export const videoDeleteButton = css`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #292929;
    border: 1px solid darkgray;
    border-radius: 20px;
    color: white;
    opacity: 0.3;
    &:hover{
        border: 1px solid white;
        box-shadow: 0px 0px 5px 0px white;
        font-weight: 600;
        opacity: 1;
    }
`;

export const video = css`
    width: 100%;
    height: 300px;
    border: 1px solid white;
    margin-bottom: 30px;
`;

export const videoDescriptionBox = css`
    width: 100% ;
    height: 110px;
    padding: 10px;
border: 1px solid white;
`;

export const videoShootingDateBox = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 23px;
    
    border: 1px solid white;
`;

export const videoShootingDate = css`
    width: 100%;
    height: 20px;
    color: white;

    border: 1px solid white;
`;

export const searchInputBox = css`
    position: fixed;
    top: 151px;
    right: 10px;
    width: 400px;
    height: 35px;
`;

export const searchInput = css`
    width: 150px;
    height: 30px;
    background-color: #292929;
    border: 1px solid darkgray;
    border-radius: 20px;
    padding: 10px;
    color: white;
    transition: all 0.3s ease-in-out;
    &:hover{
        border: 1px solid white;
        width: 300px;
        box-shadow: 0px 0px 5px 0px white;
    }

    &:focus{
        border: 1px solid white;
        width: 300px;
        box-shadow: 0px 0px 5px 0px white;
    }
`;


export const pageButton = css`
    border: 1px solid #121212;
    border-radius: 5px;
    background-color: #292929;
    color: white;
    border: 1px solid darkgray;
    &:hover{
        box-shadow: 0px 0px 5px 3px #C7BCBE;
        border: 1px solid white;
    }
    
    &:focus{
        box-shadow: 0px 0px 5px #C7BCBE;
        border: none;
        outline: none;
    }
`;

export const pageNumberButton = css`
    background-color: #fafafa;
    border-radius: 5px;
    &:hover{
        box-shadow: 0px 0px 10px 3px #C7BCBE;
        border: none;
    }
`;

export const playListVideoBox = css`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 152px;
    left: 265px;
    border-radius: 10px;
    width: 200px;
    height: 340px;
    resize: both;
    border: 1px solid white;
`;

export const playListVideoCloseButton = css`
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 20px;
    border: 1px solid darkgray;
    background-color: #292929;
    color: white;
    z-index: 999;
    &:hover{
        border: 1px solid white;
        box-shadow: 0px 0px 5px 0px white;
    }
`;

export const playListVideo = css`
    padding: 10px;
    width: 190px;
    height: 300px;
`;

export const playListVideoTitleText = css`
    color: white;
    padding: 10px;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 0px; 
    }
`;