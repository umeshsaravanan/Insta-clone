import Navbar from './Navbar/Navbar.js'
import Post from './Post/Post.js'
import ImageUploader from './ImageUploader/ImageUploader';
import { useState , useEffect } from 'react' 
import { db } from '../firebase.js';
import {collection,onSnapshot,query,orderBy } from 'firebase/firestore';
import {BiSearchAlt} from 'react-icons/bi'


const Chat = () => {
    const [post,setPost]=useState([]);

    useEffect(() => {
      const q = query(collection(db, 'post'), orderBy('timestamp', 'desc'));
      onSnapshot(q, (snapshot) => {
        setPost(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data()
          }))
        );
      })
    }, []);
    return ( 

        <div className="Chat">

          <div className="ct-box">   
            <div className="section">
            <div className="ap-left">
               <Navbar></Navbar>
            </div>
            <div className="ap-right">
              <div className="post-search">
                <label className='search-label'><BiSearchAlt size={25}></BiSearchAlt></label>
                <input type="text" placeholder='Search'/>
              </div>
              {
                post.map(({id,post}) => (
                    <Post key={id} postID={id}  username={post.username} ImageURL={post.ImageURL} comment={post.comment} />
                ))
              }
            </div>
            </div>
            </div>
        </div>
     );
}

export default Chat;