import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
const navigate= useNavigate();
  useEffect(() => {

    const getTime = localStorage.getItem("expireDate");
    const date = new Date(getTime);
    const nowDate = new Date();
    if(date.getTime() > nowDate.getTime()) {
      navigate('/signin')
    }
  }, []);
  return (
    <div className="App">
      {/* <SignUp/>
      <SignIn/> */}

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
