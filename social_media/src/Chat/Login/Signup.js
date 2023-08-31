import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from './UserAuthContext';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const Signup = () => {
  const [uname,setUname]=useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [registerNo,setregisterNo]=useState("");
  const [IsValid,setIsValid]=useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const regex = /^(20[0-9]{5}|6177212[TL][0-9]{3})$/;
    const isValidFormat = regex.test(registerNo);
    setIsValid(isValidFormat);
    setError("");
  
    if (!isValidFormat) {
      setError("Invalid register number format");
      toast.error("Invalid register number format", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      setLoading(false)
      return; 
    }
  
    try {
      await signUp(email, password);
      navigate("/");
      const colRef = collection(db, "login");
      addDoc(colRef, {
        username: uname,
        email: email,
        profileURL : ''
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };
  

  return (
    <>
    <div className="login">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="lg-box">
        <div class="lg-square b1"></div>
        <div class="lg-square b2"></div>
        <div class="lg-square b3"></div>
        <div class="lg-square b4"></div>
        <div class="lg-square b5"></div>
        <h1 className="lg-head">𝕮𝖍𝖆𝖙 𝔸𝖎</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="input-out">
            <Form.Control className="input-in"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="input-out">
            <Form.Control className="input-in"
              type="text"
              placeholder="Register Number "
              onChange={(e) => setregisterNo(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="input-out" controlId="formBasicEmail">
            <Form.Control className="input-in"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="input-out" controlId="formBasicPassword">
            <Form.Control className="input-in"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
            <div className="lg-button">
            <button id="log_in" type="Submit">
              {loading ? <ClipLoader loading={loading} color="black" size={20}/> : "Sign Up"}
            </button>
            </div>
        </Form>
        <hr className="mild-line"/>
        <div className="description lg-below">
        Already have an account? <Link to="/" className="lg-link">Log In</Link>
      </div>
      </div>
      <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default Signup;