import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
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
        <b>{username}</b>
        <p>{caption}</p>
      </h4>
    </div>
  );
}

export default Post;
