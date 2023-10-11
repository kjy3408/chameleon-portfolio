/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { HiCursorClick } from 'react-icons/hi';
import Header from '../../components/header/Header';
import * as s from './AboutStyle';


const About = () => {

    const [ angle, setAngle ] = useState(0);
    const [ isRow, setIsRow ] = useState(false);

    // 클릭했을 때 회전각도 구하기
    const rotateAngle = 360 / 6;

    // Math.tan를 사용 => 각도를 라디안 값으로 변환
    const radian = (rotateAngle / 6) * Math.PI / 180;

    // 원의 중심점에서 떨어진 거리 구하기 (밑변의 길이 / tan(각도에 해당하는 라디안))
    const colTz = Math.round((100 / 2) / Math.tan(radian));
    const rowTz = Math.round((100 / 2) / Math.tan(radian));

    const handlePrevClick = () => {
        const newAngle = angle - rotateAngle;
        setAngle(newAngle);
        updateCarouselTransform(newAngle);
    };

    const handleNextClick = () => {
        const newAngle = angle + rotateAngle;
        setAngle(newAngle);
        updateCarouselTransform(newAngle);
    };

    const instagramOnClickHandle = () => {
        window.location.href = "https://instagram.com/chamele0n_06?igshid=MWZjMTM2ODFkZg=="
    }
    

    const updateCarouselTransform = (newAngle) => {
        const carousel = document.querySelector(".carousel");
        const scene = document.querySelector(".scene");
        const carouselCard = document.querySelectorAll(".carousel-card");

        carousel.style.transform = isRow ? `rotateX(${-newAngle}deg)` : `rotateY(${-newAngle}deg)`;
        if (isRow) {
            scene.style.perspectiveOrigin = 'center';
            carouselCard.forEach((el, idx) => el.style.transform = `rotateX(${rotateAngle * idx}deg) translateZ(${rowTz}px)`);
        } else {
            scene.style.perspectiveOrigin = 'center -10%';
            carouselCard.forEach((el, idx) => el.style.transform = `rotateY(${rotateAngle * idx}deg) translateZ(${colTz}px)`);
        }
    };

    return (
        <div css={s.container}>
            <Header />
            <main css={s.mainContainer}>
                <div css={s.buttonBox} className="pre-btn" onClick={handlePrevClick}>이전</div>
                <div className="scene" css={s.sceneStyle}>
                    <div className="carousel" css={s.carouselStyle}>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div css={s.coverImgBox}>
                                김동휘
                            </div>
                        </div>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div>송주연</div>
                        </div>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div>엄성도</div>
                        </div>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div>김재영</div>
                        </div>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div>강현우</div>
                        </div>
                        <div className="carousel-card" css={s.carouselCard}>
                            <div css={s.qrCodeImgBox}>
                                <img css={s.qrCodeImg} src="/img/instaQrCode.png"/>
                            </div>
                            <div css={s.instagramIconBox} onClick={instagramOnClickHandle}>
                                <BsInstagram css={s.instagramIcon} /><label css={s.instagram}>Instagram 구경하기</label> 
                                <HiCursorClick css={s.instagramIcon} />
                            </div>
                        </div>
                    </div>
                </div>
                <div css={s.buttonBox} className="next-btn" onClick={handleNextClick}>다음</div>
            </main>
        </div>
    );
};

export default About;
