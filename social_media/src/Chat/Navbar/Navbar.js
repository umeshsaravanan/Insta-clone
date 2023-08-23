import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaEllipsisV, FaTimes } from 'react-icons/fa'
import { BsMessenger, BsFilePlus } from 'react-icons/bs';
import { BiLogOut } from "react-icons/bi"
import logo from '../Img/logo.png'
import { Avatar } from '@material-ui/core';
import ImageUploader from '../ImageUploader/ImageUploader';
import ProfileSetter from '../ProfileSetter/ProfileSetter';
import { useUserAuth } from "../Login/UserAuthContext";
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { getDocs, where, collection, query, updateDoc, doc } from 'firebase/firestore';

const Navbar = (prp) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { logOut, user } = useUserAuth();
  const curUser = prp.user
  const navigate = useNavigate();
  const [profile, setProfileURL] = useState(null);
  const [profileset, setProfileset] = useState(false)
  const [post, setPost] = useState(false)
  const handleMessage = () => {
    try {
      navigate('/gpt');
    } catch (error) {
      console.log(error.message);
    }
  }

  const pRef = collection(db, 'login')
  const q = query(pRef, where('username', '==', curUser))
  useEffect(() => {
    getDocs(q)
      .then(querySnapshot => {
        const profileData = querySnapshot.docs.map(doc => doc.data().profileURL);
        setProfileURL(profileData);
      })
      .catch(error => {
        console.error("Error getting documents: ", error);
      });
  }, [q])
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleHome = async () => {
    try {
      setTimeout(() => {
        console.log("hello");
      }, 2000);
      navigate("/home");
    }
    catch (error) {
      console.log(error.message);
    }
  }
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSetProfile = () => {
    setDropdownVisible(!isDropdownVisible)
    setProfileset(!profileset)
  }
  const handleRemoveProfile = () => {
    getDocs(q)
      .then(querySnapshot => {
        querySnapshot.docs.map((d) => {
          const docRef = doc(db, 'login', d.id);
          updateDoc(docRef, {
            profileURL: null, 
          });
        });
        setProfileset(false);
      })
      .catch(error => {
        console.error("Error Removing Profile: ", error);
      });
      setDropdownVisible(!isDropdownVisible)
  }
  
  const handleUpdateUsername = () => {

  }
  return (
    <div className="navbar">
      <div className="nav-upper">
        <div className="nav-head">
          <img src={logo} alt="Logo" width={80} height={60} className='nav-logo' />
          <div className="nav-title">ℭ𝔥𝔞𝔱 𝔸𝔦</div>
        </div>
        <div className="nav-profile">
          <div className="ava-border">
            <Avatar src={profile} style={{ width: '70px', height: '70px' }} className='nav-av'></Avatar>
          </div>
          <div className="nav-username">{prp.user}</div>
          <FaEllipsisV className="nav-menu" onClick={toggleDropdown} />
          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                <li onClick={handleSetProfile}>update Profile</li>
                <li onClick={handleRemoveProfile}>Remove Profile</li>
                <li onClick={handleUpdateUsername}>Update UserName</li>
              </ul>
            </div>
          )}
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
            
            <li onClick={() => {setPost(!post)}}>
              <BsFilePlus  size={25} />
              <p className='links'>Post</p>
            </li>
            <li onClick={handleLogout}>
              <BiLogOut size={25}></BiLogOut>
              <Link to="/" className='links'>Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
      {profileset ? <div className='profilesetup-section'>
      <ProfileSetter user={prp.user} />
      <FaTimes color='black' size={20} className='dp-close' onClick={()=>{setProfileset(!profileset)}}/>
      </div> : null}
      <div className="nav-lower">
        {post ? <div className='imageuploader-section'>
          <ImageUploader className='nav-imageuploader' user={curUser} profile={profile}></ImageUploader>
          <FaTimes color='black' size={20} className='dp-close' onClick={()=>{setPost(!post)}}/>
        </div> : null}
      </div>
    </div>);
}

export default Navbar;