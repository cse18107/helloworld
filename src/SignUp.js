import React, { useState } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { message } from "antd";
import googleLogo from "./asset/google.png";
import mailLogo from "./asset/mail.png";
import signInLogo from "./asset/user-profile.png";
// import "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    try {
      console.log("try login");
      await createUserWithEmailAndPassword(auth, email, password);
      message.success("User registered successfully");
      navigate("/signin");
    } catch (error) {
      setErrorMessage(error.message);
      message.success(error.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log(signInWithPopup);
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        console.log(result.user.accessToken);
        localStorage.setItem("accessToken", result.user.accessToken);
        localStorage.setItem(
          "expireDate",
          new Date(Date.now() + 2 * (60 * 60 * 1000))
        );
        message.success("User registered successfully");
        navigate("/");
      })
      .catch((error) => {
        // handle login error
        message.error(error.message);
      });
  };

  return (
    <div className="screen">
      <div className="container">
        <img
          style={{ height: "100px", marginTop: "10px" }}
          src={signInLogo}
          alt="sign in"
        />
        <h2>Sign Up</h2>
        <div className="input">
          <h4>Email</h4>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <h4>Password</h4>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mailbtn" onClick={handleSignUp}>
          <img src={mailLogo} alt="mail" />
          Sign Up
        </button>
        <Link className="link" to={"/signin"}>
          Have an account? Please log in
        </Link>
        {/* {errorMessage && <p>{errorMessage}</p>} */}
        <button className="googlebtn" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="google" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
