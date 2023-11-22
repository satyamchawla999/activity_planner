// src/components/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../feature/user/authSlice";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./style.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== cPassword) {
      openNotificationWithIcon("error", "Confirm password not matched");
      return;
    }

    try {
      const data = {
        name,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/sign-up",
        data
      );
      if (response && response.status === 201) {
        openNotificationWithIcon(
          "success",
          "Signup successfull you can login now"
        );
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else if (response && response.status === 204) {
        openNotificationWithIcon(
          "error",
          "User with same credentials already present"
        );
      } else {
        throw new Error();
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error in signing up");
    }

    setName("");
    setEmail("");
    setPassword("");
    setCpassword("");
    setLoading(false);
  };

  return (
    <>
      {contextHolder}

      <div className="SignupPageContainer">
        <div className="leftContainer">
          {/* <img src={require('../../assets/images/loginImage.png')} alt='#'/> */}
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px 0px  0px 5px",
            }}
            src={require("../../assets/images/loginFlip.png")}
            alt="*"
          />
        </div>

        <div className="rightContainer">
          <div className="petLogo">
            <img src={require("../../assets/images/dog.png")} alt="#" />
            <p>Pet Care</p>
          </div>
          <h1>Sign Up</h1>

          <form className="formSection" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={cPassword}
              onChange={(e) => setCpassword(e.target.value)}
              required
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
                <>Sign Up</>
              )}
            </button>
          </form>

          <div className="pageChange">
            Already have an account?{" "}
            <Link className="Link" to="/signin">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
