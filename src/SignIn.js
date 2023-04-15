import React, { useState } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import googleLogo from "./asset/google.png";
import mailLogo from "./asset/mail.png";
import signInLogo from "./asset/user-profile.png";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    console.log("try login");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("accessToken", result.user.accessToken);
        localStorage.setItem("expireDate", new Date(Date.now() + 2 * (60 * 60 * 1000) ));
        message.success("User sign in successfully");
        navigate("/");
      })
      .catch((error) => {
        message.error(error.message);
      });
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
        message.success("User sign in successfully");
        navigate("/");
      })
      .catch((error) => {
        // handle login error
        message.error(error.message);
      });
  };

  console.log(window.screen.height);

  return (
    <div className="screen">
      <div className="container">
        <img
          style={{ height: "100px", marginTop: "10px" }}
          src={signInLogo}
          alt="sign in"
        />
        <h2>Sign In</h2>
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

        <button className="mailbtn" onClick={handleSignIn}>
          <img src={mailLogo} alt="mail" />
          Sign In
        </button>
        <Link className="link" to={"/signup"}>
          Don't have an account? Please register
        </Link>
        {/* {errorMessage && <p>{errorMessage}</p>} */}
        <button className="googlebtn" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="google" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
