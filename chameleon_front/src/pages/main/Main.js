/** @jsxImportSource @emotion/react */ 
import React, { useEffect, useState } from 'react';
import * as s from './MainStyle';
import Header from '../../components/header/Header';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { AiFillPlayCircle } from 'react-icons/ai';
import Category from '../../components/category/Category';

const Main = () => {

    const [ getVideosRefresh, setGetVideosRefresh ] = useState(true);
    const [ getVideosData, setGetVideosData ] = useState({page: 1, searchValue:""}); 
    const [ videoData, setVideoData ] = useState([]); 
    const [ getPlayListFlag, setGetPlayListFlag ] = useState(true);  
    const [ playListData, setPlayListData] = useState([]);
    const [ categoryId, setCategoryId ] = useState("5");
    const [ currentVideoUrl, setCurrentVideoUrl ] = useState(""); 
    const [ currentVideoTitle, setCurrentVideoTitle ] = useState("");
    const [ deleteButtonFlag, setDeleteButtonFlag ] = useState(false); 
    const [ nickname, setNickname ] = useState("");
    const [ getUserInfoRefresh, setGetUserInfoRefresh ] = useState(true); 

    const searchValueOnChangeHandle = (e) => {
        setGetVideosData({...getVideosData, searchValue:e.target.value})    
        setGetVideosRefresh(true)
    }
  
    const getUserInfo = useQuery(["getUserInfo"], async() => {
        const option = {
            headers: {
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        try {
            const response = await axios.get("http://localhost:8080/auth/userInfo", option)
            return response
        } catch (error) {
            
        }
    }, {
        enabled: getUserInfoRefresh,
        onSuccess: (response) => {
            setGetUserInfoRefresh(false);
            setNickname(response.data.name)
        }
    })
    const getVideos = useQuery(["getVideos"], async() => {
        const response = await axios.get("http://localhost:8080/file/videos", {
            params: {
                ...getVideosData,
                categoryId: categoryId
            }
        });
  
        return response
    }, {
        enabled: getVideosRefresh,
        onSuccess: (response) => {
            const videoDataArray = response.data.videos.map((video) => ({
                videoId: video.videoId,
                videoTitle: video.videoTitle,
                videoFileUrl: `http://localhost:8080/videos/band/${video.videoName}`,
                uploadDate: video.uploadDate
            }));
            
            setVideoData(videoDataArray);
            setGetVideosRefresh(false);
        }
    })

    const getPlayList = useQuery(["getPlayList"], async () => {
        const response = await axios.get("http://localhost:8080/file/playlist");
    
        return response;
      }, {
        enabled: getPlayListFlag,
        onSuccess: (response) => {            
            setPlayListData(response.data);
            setGetPlayListFlag(false);

        },
      });

    const deleteVideo = useMutation(async(videoId, videoName) => {
        const option = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            params: {
                videoId: videoId
            }
        }
        try {
            await axios.delete("http://localhost:8080/file/delete", option)
        } catch (error) {
            if(error.response.status === 401){
                alert("관리자 인증에 문제가 생겼으니 다시 로그인 해주세요.")
                localStorage.removeItem("accessToken")
                window.location.href = "http://localhost:3000/auth/login"
            }
        }
    }, {
        onSuccess: () => {
            getVideos.refetch();
            getPlayList.refetch();
        }
    })

    const videoDeleteButtonHandle = (videoId) => {
        if(window.confirm("진짜 지운다? 복구 안된다?")){
            if(localStorage.getItem("accessToken") !== null){
                // setDeleteVideoRefresh(true)
                deleteVideo.mutate(videoId);
            }
        }
    }

    const playListVideoCloseButtonHandle = () => {
        setCurrentVideoUrl("");
        setCurrentVideoTitle("");
    }

    const playListClickHandle = (videoUrl, videoTitle) => {
        setCurrentVideoUrl(`http://localhost:8080/videos/band/${videoUrl}`);
        setCurrentVideoTitle(videoTitle);
    }

    const pagination = () => {
        if (getVideos.isLoading) {
            return <div>로딩중</div>;
        }

        let nowPage = getVideosData.page;
        const lastPage = getVideos.data.data.totalCount % 3 === 0
            ? getVideos.data.data.totalCount / 3
            : Math.floor(getVideos.data.data.totalCount / 3) + 1;

        const startIndex = nowPage % 5 === 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
        const endIndex = startIndex + 4 <= lastPage ? startIndex + 4 : lastPage;

        const pageNumbers = new Array();

        for (let i = startIndex; i <= endIndex; i++) {
            pageNumbers.push(i);
        }

        return (
            <>
                {videoData.length === 0 ? (
                    <div>영상이 없습니다.</div>
                ) : (
                    <>
                        <button
                            css={s.pageButton}
                            disabled={nowPage === 1}
                            onClick={() => {
                                // scrollToTop();
                                setGetVideosData({ ...getVideosData, page: 1 });
                                setGetVideosRefresh(true);
                            }}
                        >
                            처음으로
                        </button>
                            {pageNumbers.map((page) => (
                                <button
                                    css={s.pageNumberButton}
                                    onClick={() => {
                                        setGetVideosData({ ...getVideosData, page });
                                        setGetVideosRefresh(true);
                                    }}
                                    disabled={page === nowPage}
                                    key={page}
                                >
                                    {page}
                                </button>
                            ))}
        
                        <button
                            css={s.pageButton}
                            disabled={nowPage === lastPage}
                            onClick={() => {
                                // scrollToTop();
                                setGetVideosData({ ...getVideosData, page: lastPage });
                                setGetVideosRefresh(true);
                            }}
                        >
                            끝으로
                        </button>
                    </>
                )}
            </>
        );
    };
    
 
    if(getVideos.isLoading){
        return <div>로딩중..</div>
    }

    if(getPlayList.isLoading){
        return <div>로딩중</div>
    }

    return (
        <div css={s.container}>
            <Header setDeleteButtonFlag={setDeleteButtonFlag}/>
            <main css={s.mainContainer}>
            <Category  setCategoryId={setCategoryId} setGetVideosRefresh={setGetVideosRefresh} setGetVideosData={setGetVideosData}/>
                <div css={s.playListContainer}>
                    <div css={s.nicknameBox}>
                        <label css={s.nickname}>{nickname}</label>
                    </div>
                    <div css={s.playListTitleBox}>
                        <label css={s.playListTitle}>Play List</label>
                    </div>
                    <div css={s.playListBox}>
                    {getPlayList.isLoading ? (<div>로딩중...</div>) : playListData !== undefined ? playListData.map(video => (
                        <div key={video.videoId} css={s.videoListBox} onClick={() => playListClickHandle(video.videoName, video.videoTitle)}>
                            <AiFillPlayCircle css={s.playListIcon}/> <label css={s.playListVideoTitle}>{video.videoTitle}</label>
                        </div>
                    )) : "찾을 수 없음"}
                    {currentVideoUrl === "" ? ("") : (
                        <div css={s.playListVideoBox} onClick={playListVideoCloseButtonHandle}>
                            <button css={s.playListVideoCloseButton}>닫기</button>
                            <video css={s.playListVideo} src={currentVideoUrl} controls autoPlay loop>

                            </video>
                            <label css={s.playListVideoTitleText}>{currentVideoTitle}</label>
                        </div>
                    )}
                    </div>
                </div>
                {getVideos.isLoading ? (<div>로딩중...</div>) : videoData !== undefined ? videoData.map((video, index) => (
                    <div css={s.videoBox} key={index}>
                        <div css={s.videoTitleBox}>
                            <label css={s.videoTitle}>{video.videoTitle}</label>
                        </div>
                        {deleteButtonFlag ? (
                            <button css={s.videoDeleteButton} onClick={() => videoDeleteButtonHandle(video.videoId)}>삭제</button>
                        ) : ""}
                        <video css={s.video} src={video.videoFileUrl} controls>
                        </video>
                    </div>
                )) : "찾을 수 없음"}
                <div css={s.searchInputBox}>
                    <input css={s.searchInput}  type="text" placeholder='Search...' onChange={searchValueOnChangeHandle}/>
                </div>
                <div>
                    {pagination()}
                </div>
            </main>
        </div>
    );
};

export default Main;