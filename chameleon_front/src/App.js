/** @jsxImportSource @emotion/react */
import './App.css';
import './global/Reset'
import { Global, css } from '@emotion/react';
import { Reset } from './global/Reset';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './AuthRoute/AuthRoute';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Main from './pages/main/Main';
import Upload from './pages/upload/Upload';
import About from './pages/about/About';

const container = css`
  position: relative;
  display: flex;
  /* justify-content: center;// */
  /* align-items: center; */
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #121212;
  color: white;
    
  ::-webkit-scrollbar {
        width: 0px; /* 스크롤바의 너비를 조절합니다. */
    }

`;
function App() {
  return (
    <div css={container}>
      <Global styles={Reset}></Global>
      <Routes>
        <Route path="/auth/login"element={<Login/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/chameleon" element={<About/>}/>
        <Route path="/upload" element={<AuthRoute path="/upload" element={<Upload/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
