/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import * as s from './HeaderStyle';
import { GiMusicalScore } from 'react-icons/gi';
import { AiOutlineMenu } from 'react-icons/ai';
import axios from 'axios';
import { useQuery } from 'react-query';

const Header = ({ setDeleteButtonFlag }) => {

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);
    const [ currentColorIndex, setCurrentColorIndex ] = useState(0);
    const [ uploadMenuFlag, setUploadMenuFlag] = useState(false);
    const [ confirmLoginFlag, setConfirmLoginFlag ] = useState(false);
    const [ checkUserPermissionRefresh, setCheckUserPermissionRefresh ] = useState(true);
    const colors = [ '#BFDF91','##BAF368','##A7F536'
                    ,'#7EDE77','#8DFF85','#5DF8C4'
                    ,'#00FFAA','#00FBFF','#80F5F6'
                    ,'#9DCDFB','#70B5F6','#8589FB'
                    ,'#C185FB','#FB85F1','#F9D1E7'
                    ,'#FFEC9E','#EBFF9E' ];

    const changeTextColor = () => {
        setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    };

    useEffect(() => {
        confirmLogin();
        const interval = setInterval(changeTextColor, 100);
        return () => clearInterval(interval);
    }, []);
    
    const confirmLogin = () => {
        if(localStorage.getItem("accessToken") !== null){
            setConfirmLoginFlag(true);
        }
        if(localStorage.getItem("accessToken") === null){
            setConfirmLoginFlag(false);
        }
        return null;
    }


    const checkUserPermission = useQuery(["checkUserPermission"], async()=> {
        const option = {
            headers:{
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const response = await axios.get("http://localhost:8080/auth/check/permission", option)
        if(response.data === "ADMIN"){
            setUploadMenuFlag(true);
            setDeleteButtonFlag(true)
        }else{
            setUploadMenuFlag(false);
        }
   
        return response
    }, {
        enabled: checkUserPermissionRefresh,
        onSuccess: () => {
            setCheckUserPermissionRefresh(false)
        }
    })

    const logoutButtonHandle = () => {
        if(window.confirm("로그아웃 하시겠습니까?")){
            localStorage.removeItem("accessToken")
            window.location.href = "http://localhost:3000/auth/login"
        }
    }

    const loginPageButtonHandle = () => {
        window.location.href = "http://localhost:3000/auth/login"
    }

    const mainPageHandle = () => {
        window.location.href = "http://localhost:3000/"
    }

    const menuOpenButtonHandle = () => {
        setMenuIsOpen(!menuIsOpen);
    }

    const mainPageButtonHandle = () => {
        window.location.href = "http://localhost:3000/"
    }

    const uploadPageButtonHandle = () => {
        window.location.href = "http://localhost:3000/upload"
    }

    const aboutCameleonPageButtonHandle = () => {
        window.location.href = "http://localhost:3000/chameleon"
    }

    return (
        <div css={s.contaier}>
            <div css={s.menuButtonBox}>
                <button css={s.menuButton} onClick={menuOpenButtonHandle}>
                    <AiOutlineMenu css={s.menuButtonIcon} />
                </button>
                <div css={s.menuContainer(menuIsOpen)}>
                    {confirmLoginFlag ? (
                        <div css={s.menuButtonsBox}>
                            <button css={s.menuButtons} onClick={logoutButtonHandle}>
                                Log out
                            </button>
                        </div>
                    ) : (
                         <div css={s.menuButtonsBox}>
                            <button css={s.menuButtons} onClick={loginPageButtonHandle}>
                                Log in
                            </button>
                        </div>
                    )}
                   
                    <div css={s.menuButtonsBox}>
                        <button css={s.menuButtons} onClick={mainPageButtonHandle}>
                            Main
                        </button>
                    </div>
                    {uploadMenuFlag ? (
                        <div css={s.menuButtonsBox}>
                            <button css={s.menuButtons} onClick={uploadPageButtonHandle}>
                                upload
                            </button>
                        </div>
                    ) : ""}
                  
                    <div css={s.menuButtonsBox}>
                        <button css={s.menuButtons} onClick={aboutCameleonPageButtonHandle}>
                            info
                        </button>
                    </div>
                </div>
            </div>
            <div css={s.pageTitleBox} onClick={mainPageHandle}>
                <div css={s.titleIconBox}><label css={s.titleIcon} ><GiMusicalScore style={{ fill: colors[currentColorIndex]}}/></label></div>
                <div css={s.titleBox}><label css={s.title} style={{ color: colors[currentColorIndex] }}>Chameleon</label></div>
                <div css={s.miniTitleBox} style={{ color: colors[currentColorIndex] }}>_06</div>
            </div>
        </div>
    );
};

export default Header;