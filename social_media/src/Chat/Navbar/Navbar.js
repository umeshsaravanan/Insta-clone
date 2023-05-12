import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import {FaHome, FaUserTie} from 'react-icons/fa'
import { BsMessenger } from 'react-icons/bs';
import {BiLogOut} from "react-icons/bi"
import logo from '../Img/logo.png'
import profile from '../Img/profile1.JPG'
import { Avatar } from '@material-ui/core';
import ImageUploader from '../ImageUploader/ImageUploader';
import { useUserAuth } from "../Login/UserAuthContext";


const Navbar = () => {
const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleMessage =() =>{
    //try {
         navigate('/gpt');
    // } catch (error) {
    //     console.log(error.message);
    // }
}

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleHome=async()=>{
    try{
        setTimeout(()=>{
            console.log("hello");
        },2000);
         navigate("/home");
    }
    catch(error){
        console.log(error.message);
    }
  }
    return ( 
    <div className="navbar">
        <div className="nav-upper">
            <div className="nav-head">
                <img src={logo} alt="Logo" width={80} height={60} className='nav-logo'/>
                <div className="nav-title">ℭ𝔥𝔞𝔱 𝔸𝔦</div>
            </div>
            <div className="nav-profile">
                <div className="ava-border">
                <Avatar src={profile} style={{width : '70px',height : '70px'}} className='nav-av'></Avatar>
                </div>
                <div className="nav-username">Nitheesh Kumar </div>
            </div>
            <div className="nav-links">
                <ul>
                    <li onClick={handleHome}>
                        <FaHome size={25}></FaHome>
                        <Link to="/home" className='links'>Home</Link>
                    </li>
                    <li>
                        <BsMessenger size={25} onClick={handleMessage}></BsMessenger>
                        <Link to="/gpt" className='links'>Messages</Link>
                    </li>
                    <li>
                        <FaUserTie size={25}></FaUserTie>
                        <Link to="/" className='links'>Ask Experts</Link>
                    </li>
                    <li onClick={handleLogout}>
                        <BiLogOut size={25}></BiLogOut>
                        <Link to="/" className='links'>Log Out</Link>
                    </li>
                </ul>
            </div>
        </div>
        <div className="nav-lower">
            <ImageUploader className='nav-imageuploader'></ImageUploader>
        </div>
    </div> );
}
 
export default Navbar;