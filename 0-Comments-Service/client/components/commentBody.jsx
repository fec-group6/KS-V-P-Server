import styled from 'styled-components';
import Comment from './comment.jsx';
import React from 'react';

const CommentBody = (props) => {
  
  let comments = [];
  for (let i = 0; i < props.userPosts.length; i++) {
    let userPostData = props.userPosts[i];
    comments.push(<Comment image={userPostData.image} username={userPostData.username} commentDate={userPostData.commentDate} likes={userPostData.likes} dislikes={userPostData.dislikes} text={userPostData.text} replies={userPostData.replies} />);
  }
  for (let i = 0; i < props.commentData.length; i++) {
    let data = props.commentData[i];
    comments.push(<Comment image={data.image} username={data.username} commentDate={data.commentDate} likes={data.likes} dislikes={data.dislikes} text={data.text} replies={data.replies} />);
  }

  return (
    <div>
      {comments}
    </div>
  );
};

export default CommentBody;