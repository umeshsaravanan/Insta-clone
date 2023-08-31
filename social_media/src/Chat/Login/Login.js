import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./UserAuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { db} from "../../firebase";
import { getDocs } from "firebase/firestore";
import { collection} from "firebase/firestore";
import { ClipLoader } from 'react-spinners';


const Login = (prp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [loginList,setloginList]=useState([]);
  const [loading, setLoading] = useState(false);
  let user = "";
  useEffect(() => {
    const colRef = collection(db, "login");
    const array = [];
  
    getDocs(colRef).then((snapshot) => {
      snapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
  
      setloginList(array);
    });
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await logIn(email, password);
      if(loginList.length>0){
        loginList.forEach((e)=>{
          if(e.email===email){
            prp.user(e.username)
            user = e.username
          }
        })
      }
      navigate(`/home/${user}`);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message, {
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
          <button id="log_in" type="Submit" onClick={handleSubmit}>
              {loading ? <ClipLoader loading={loading} color="black" size={20}/> : "Log in"}
          </button>
          </div>
        </Form>
        <hr className="mild-line"/>
        <div className="description lg-below">
        Don't have an account? <Link to="/signup" className="lg-link"> Sign up</Link>
      </div>
      </div> 
      <ToastContainer></ToastContainer>
      </div>
    </>
    
  );
};

export default Login;