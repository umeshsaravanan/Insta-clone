import { FaEllipsisH } from 'react-icons/fa'
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import { BiPaperPlane } from 'react-icons/bi'
import { BsBookmarkFill, BsBookmarks } from 'react-icons/bs'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'
import { useEffect, useState, useRef } from 'react'
import { db } from '../../firebase'
import { doc,deleteDoc,  collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, updateDoc } from "firebase/firestore";


const Post = ({ postID, username, ImageURL, profileURL, comment, user, likes, Saved }) => {
    const [userComments, setuserComments] = useState([]);
    const [userComment, setuserComment] = useState('');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [like, setLike] = useState(false);
    const [autofocus, setAutofocus] = useState(false);
    const inputRef = useRef(null);
    const [saved, setSaved] = useState(Saved);
    useEffect(() => {
        let unsubscribe;
        if (postID) {
            const postRef = doc(db, "post", postID);
            const commentsRef = query(
                collection(postRef, "userComments"),
                orderBy("timestamp", "asc")
            );
            unsubscribe = onSnapshot(commentsRef, (snapshot) => {
                setuserComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe && unsubscribe();
        };
    }, [postID]);

    const postComment = (event) => {
        event.preventDefault();
        addDoc(collection(doc(db, "post", postID), "userComments"), {
            text: userComment,
            username: user,
            timestamp: serverTimestamp()
        })
        setuserComment("");
    };

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const handleLike = async () => {

        setLike(!like)
        const newLikes = {
            likes : likes + 1
        }
        updateDoc(doc(db,'post',postID),newLikes)
        .then(() => {
            console.log('Document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
    }

    const handledisLike = async () => {

        setLike(!like)
        const newLikes = {
            likes : likes - 1
        }
        updateDoc(doc(db,'post',postID),newLikes)
        .then(() => {
            console.log('Document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
    }

    const handleDeletePost = async () => {
        try {
            await deleteDoc(doc(db, 'post', postID));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    const handleSaved = () => {
        setSaved(!saved);
    }
    return (
        <div className="post">
            <div className="post_title">
                <div className="post_left">
                    <div className="profile">
                        <Avatar className="Profile_pic" src={profileURL} alt='Profile' />
                    </div>
                    <div className="name">
                        <b>{username}</b>
                    </div>
                </div>
                <div className="post_right">
                    <div className="ellip" onClick={toggleDropdown}>
                        <FaEllipsisH />
                    </div>
                    {isDropdownVisible && (
                        <div className="dropdown">
                            <ul>
                                <li onClick={handleDeletePost}>Delete</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div class="image">
                <img src={ImageURL} alt="img1" />
            </div>
            <div className="post_footer">
                <div className="icons">
                    <div className="post_left">
                        <div class="comment">
                            {like ? (<AiFillHeart color='red' onClick={handledisLike} />) : (<AiOutlineHeart onClick={handleLike} />)}
                            <AiOutlineComment onClick={() => {
                                if(!autofocus){
                                    setAutofocus(!autofocus);
                                    inputRef.current.focus();
                                }
                                else{
                                    setAutofocus(!autofocus);
                                    inputRef.current.blur();
                                }

                            }}/>
                            <BiPaperPlane />
                        </div>
                        <div className='likescount'>
                            <p>Liked by <span style={{fontWeight : 'bold'}}>{likes}</span> users</p>
                        </div>
                    </div>
                    <div className="post_right">
                        <div class="save">{saved?<BsBookmarkFill onClick={handleSaved}/>:<BsBookmarks onClick={handleSaved} />}</div>
                    </div>
                </div>
                <div className="details">
                    <div className="comments">{comment}</div>
                </div>
                <div className="post_comments">
                    {
                        userComments.map((comment) => (
                            <p>
                                <strong>{comment.username}</strong> {comment.text}
                            </p>
                        ))}
                </div>

                <div className="write mild">
                    <div className="left_side">
                        <input type="text" placeholder="Add a comment...." value={userComment} onChange={(e) => setuserComment(e.target.value)} ref={inputRef}/>
                    </div>
                    <div className="right_side">
                        <button disabled={!userComment} type='submit' onClick={postComment} className="post-btn">Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;