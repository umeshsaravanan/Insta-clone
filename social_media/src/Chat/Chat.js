import Navbar from './Navbar/Navbar.js'
import Post from './Post/Post.js'
import { useState , useEffect } from 'react' 
import { db } from '../firebase.js';
import {collection,onSnapshot,query,orderBy } from 'firebase/firestore';
import {BiSearchAlt} from 'react-icons/bi'
import { useParams } from 'react-router-dom';


const Chat = (prp) => {
    const [post,setPost]=useState([]);
    const {user} = useParams();

    useEffect(() => {
      const postQuery = query(collection(db, 'post'), orderBy('timestamp', 'desc'));
      const postUnsubscribe = onSnapshot(postQuery, snapshot => {
        setPost(
          snapshot.docs.map(doc => ({
            id: doc.id,
            saved: false,
            post: doc.data()
          }))
        );
      });
  
     
      return () => {
        postUnsubscribe();
      };
    }, [prp.user]);
    return ( 

        <div className="Chat">

          <div className="ct-box">   
            <div className="section">
            <div className="ap-left">
               <Navbar user={user}></Navbar>
            </div>
            <div className="ap-right" style={{width : '60%'}}>
              <div className="post-search">
                <label className='search-label'><BiSearchAlt size={25}></BiSearchAlt></label>
                <input type="text" placeholder='Search'/>
              </div>
              {
                post.map(({id,saved,post}) => (
                    <Post key={id} postID={id} Saved={saved} profileURL={post.Avatar} username={post.username} ImageURL={post.ImageURL} comment={post.comment} user={prp.user} likes={post.likes}/>
                ))
              }
            </div>
            </div>
            </div>
        </div>
     );
}

export default Chat;