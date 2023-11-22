// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../feature/user/authSlice";
import { ThreeDots } from "react-loader-spinner";
import axios from 'axios';
import { notification } from "antd";
import {Link, useNavigate} from 'react-router-dom'

import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email,
        password
      }
      
      const response = await axios.post("http://localhost:3001/users/sign-in",data);
      if( response && response.status === 201) {
        openNotificationWithIcon("success", "Signin successfull!");
        const uid = response.data.user._id
        dispatch(setUser({uid}));
        setTimeout(()=>{
          dispatch(login())
        },1000)
      } 
      else if ( response && response.status === 204) {
        openNotificationWithIcon("error", "No user found!");
      } 
      else {
        throw new Error()
      }
    } catch(err) {
      openNotificationWithIcon("error", 'Error in signing in');
    }

    setEmail('');
    setPassword('');
    setLoading(false);

  };

  return (
    <>
      {contextHolder}

      <div className="loginPageContainer">
        <div className="leftContainer">
          {/* <img src={require('../../assets/images/loginImage.png')} alt='#'/> */}
          <img
            src={require('../../assets/images/login.png')}
            alt="*"
          />
        </div>

        <div className="rightContainer">
          <div className="petLogo" style={{marginTop:"-20px",marginBottom:"10px"}} >
            <img src={require('../../assets/images/dog.png')} alt="#"/>
            <p>Pet Care</p>
          </div>
          <h1>Sign In</h1>

          <form className="formSection" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>
              {loading ? (
                <ThreeDots
                  height="40"
                  width="40"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                <>Sign In</>
              )}
            </button>
          </form>

          <div className="pageChange">New User? <Link className="Link" to='/signup'>Sign Up</Link></div>
        </div>
      </div>
    </>
  );
};

export default Login;
