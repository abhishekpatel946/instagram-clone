import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ username, user, caption, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  // postComment to fire our database
  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="AbhishekPatel"
          src="/static/image/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt="" />

      <h4 className="post_text">
        <strong>{username}</strong>
        <p>{caption}</p>
      </h4>

      {/* comments from firebase */}
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>
            {comment.comment}
          </p>
        ))}
      </div>

      <form className="post_commentBox">
        <input
          className="post_input"
          type="text"
          placeholder="Add a comments..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post_button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
