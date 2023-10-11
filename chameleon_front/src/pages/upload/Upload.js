
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from './UploadStyle';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { useMutation, useQuery } from 'react-query';
import Header from '../../components/header/Header';

const Upload = () => {
    const [ uploadFile, setUploadFile ] = useState(null);
    const [ fileTitle, setFileTitle ] = useState({fileTitle:""});
    const [ chooseCategoryError, setChooseCategoryError] = useState(true);
    const [ chooseCategoryValue , setChooseCategoryValue ] = useState("카테고리를 선택하세요");
    const [ clickCategoryId, setClickCategoryId ] = useState(""); 
    const [ errorMessages, setErrorMessages ] = useState({title:"", categoryId:""}); 
    const [ uploadLoading, setUploadLoading ] = useState(false);
    const [checkUserPermissionRefresh, setCheckUserPermissionRefresh ] = useState(true); 

    const fileTitleOnChange = (e) => {
        setFileTitle({fileTitle: e.target.value})
        setErrorMessages({...errorMessages, title:""})
    }

    const checkUserPermission = useQuery(["checkUserPermission"], async()=> {
        const option = {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/auth/check/permission", option)
      
        console.log(response)
        return response
    }, {
        enabled:checkUserPermissionRefresh,
        onSuccess:(response) => {
            setCheckUserPermissionRefresh(false);
            if(response.data !== "ADMIN"){
                alert("관리자가 아닙니다.")
                window.location.replace("http://localhost:3000/")
            }
        }
    })

    const [ dropZoneProps, setDropZoneProps ] = useState({
        accept: {
            'video/mp4':['.mp4']
        }
    })

    const handleDrop = async (files) => {
        setUploadFile(files[0]);
    };

    const handleUpload = () => {
        uploadVideo.mutate();
    } 

    const chooseCategoryButtonHandle = (categoryId) => {
        setChooseCategoryError(false)
        setClickCategoryId(categoryId)
        setErrorMessages({...errorMessages, categoryId: ""})
        if(categoryId === 1){
            setChooseCategoryValue("영상 일지")
        }
        if(categoryId === 2){
            setChooseCategoryValue("축가")
        }
        if(categoryId === 3){
            setChooseCategoryValue("공연")
        }
        if(categoryId === 4){
            setChooseCategoryValue("공연 관람")
        }
    }

    const uploadVideo = useMutation( async() => {
        if (!uploadFile) {
            alert('업로드할 파일을 선택하세요.');
        return;
        }
        const formData = new FormData();
        formData.append('file', uploadFile);
        formData.append('title', fileTitle.fileTitle)
        formData.append('categoryId', clickCategoryId)

        const option = {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
            }
        }

        if (window.confirm('영상을 업로드 하시겠습니까?')) {
            setUploadLoading(true);
            console.log("???????????????" + fileTitle.fileTitle)
            try {
                await axios.post('http://localhost:8080/file/upload', formData, option);
                setFileTitle("");
                setClickCategoryId("");
                alert("업로드 완료~")
                window.location.reload()
            } catch (error) {   
                console.log(error.response.data.errorData)
                if(error.response.status === 401){
                    alert("관리자 계정에 문제가 생겼습니다. 다시 로그인 해주세요.")
                    localStorage.removeItem("accessToken")
                    window.location.replace("http://localhost:3000/auth/login");
                }
                setChooseCategoryError(true)
                setErrorMessages({title:"", categoryId:"", ...error.response.data.errorData})
            }
        }
    },{
        onSuccess: () => {
            setUploadLoading(false);

        }
    })

    return (
        <div css={s.container}>
            <Header />
            {uploadFile ? (
                <div css={s.uploadFileContainer}>
                    <div css={s.uploadFileNameBox}>
                        <p css={s.uploadFileName}>{uploadFile.name}</p>
                    </div>
                    <video controls css={s.uploadVideo}>
                        <source src={URL.createObjectURL(uploadFile)} type="video/mp4" />
                    </video>
                    <div css={s.uploadFileNameInputAndChooseCategoryBox}>
                        <div css={s.chooseCategoryValueAndInputBox}>
                            <label css={s.chooseCategoryValue}>{chooseCategoryValue}</label>
                            <input css={s.uploadFileTitle} onChange={fileTitleOnChange} type="text" value={fileTitle.fileTitle} placeholder='영상 제목을 입력하세요.'/>
                        </div>
                        <label css={s.errorMessage}>{errorMessages.title}</label>
                        <div css={s.categoryBox}>
                            <button css={s.categoryButton(chooseCategoryError)} onClick={() => chooseCategoryButtonHandle(1)}>영상 일지</button>
                            <button css={s.categoryButton(chooseCategoryError)} onClick={() => chooseCategoryButtonHandle(2)}>축가</button>
                            <button css={s.categoryButton(chooseCategoryError)} onClick={() => chooseCategoryButtonHandle(3)}>공연</button>
                            <button css={s.categoryButton(chooseCategoryError)} onClick={() => chooseCategoryButtonHandle(4)}>공연 관람</button>
                        </div>
                        <label css={s.errorMessage}>{errorMessages.categoryId}</label>
                    </div>
                    <div css={s.uploadButtonBox}>
                        <button css={s.uploadButton} onClick={handleUpload}>업로드 하기</button>
                    </div>
                </div>
            ) : (
                <Dropzone onDrop={handleDrop} accept={dropZoneProps.accept}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input css={s.uploadInput} {...getInputProps()} />
                        <p css={s.addFileButton}>동영상 파일을 여기에 끌어 놓거나 클릭하여 업로드하세요.</p>
                    </div>
                )}
                </Dropzone>
            )}
            {/* {uploadLoading ? (
                <div css={s.uploadLoadingContaier}>
                    <div css={s.uploadLoadingBox}>
                        <label css={s.uploadText}>업로드 중..</label>
                    </div>
                </div>
            ) : ""} */}
            
        </div>
    );
};

export default Upload;