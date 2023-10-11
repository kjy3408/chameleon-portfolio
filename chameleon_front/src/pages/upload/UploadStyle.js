import { css } from "@emotion/react";

export const container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #121212;
  width: 100%;
  height: 100vh;
  margin-top: 50px;
`;
export const uploadFileContainer = css`
    position: fixed;
    width: 400px;
    height: 600px;
    border-radius: 20px;
    border: 1px solid white;
`;

export const uploadFileNameBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 50px;
    margin: auto;
`;

export const uploadFileName = css`
    font-weight: 600;
    color: white;
`;

export const uploadVideo = css`
    display: flex;
    margin: auto;
    width: 380px;
    height: 350px;
`;

export const uploadFileNameInputAndChooseCategoryBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;
`;

export const chooseCategoryValueAndInputBox = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const chooseCategoryValue = css`
    color: white;
    margin-bottom: 10px;
`;

export const categoryBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 65%;
    margin: 10px 0px 10px 0px;
`;

export const categoryButton = (chooseCategoryError) => css`
    background-color: #202020;
    border: ${chooseCategoryError ? "2px solid red" : "1px solid darkgray"};
    box-shadow: 0px 0px 5px 3px white;
    border-radius: 10px;
    color: white;

    &:hover{
        border: 1px solid white;
        box-shadow: 0px 0px 5px 0px white;
        font-weight: 600;
    }

    &:focus{
        border: 2px solid greenyellow;
    }
`;

export const uploadFileTitle = css`
    padding: 3px;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const uploadButtonBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 20px;
`;

export const uploadButton = css`
  padding: 10px 20px;
  background-color: #007bff;
  margin: auto;
  width: 80%;
  border-radius: 5px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;


export const uploadInput = css`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const addFileButton = css`
     padding: 10px 20px;
    background-color: #007bff;
    margin: auto;
    width: 470px;
    border-radius: 5px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const errorMessage = css`
    font-size: 12px;
    color: red;
`;

export const uploadLoadingContaier = css`
   background-color: rgba(18, 18, 18, 0.8); /* 부모 요소에 투명한 배경 적용 */
    position: relative;
    width: 100%;
    height: 100vh;
    border: 1px solid white;
`;

export const uploadLoadingBox = css`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 35%;
    left: 40%;
    width: 300px;
    height: 200px;
    border: 1px solid white;
    z-index: 999;
    background-color: #292929;
    opacity: 1; /* 자식 요소에는 투명도 적용하지 않음 */
`;

export const uploadText = css`
    
    color: white;
`;