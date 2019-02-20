import styled from 'styled-components';
import React from 'react';
import CommentHead from './commentHead.jsx';
import CommentBody from './commentBody.jsx';
import { readyComments } from '../clientHelpers.js';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: readyComments(this.props.commentData),
      userPosts: [],
      commentCount: this.props.commentData.length
    };
    this.prependUserComment = this.prependUserComment.bind(this);
  }

  prependUserComment(userPost) {
    this.setState({
      userPosts: [userPost, ...this.state.userPosts],
      commentCount: this.state.commentCount + 1
    });
  }

  render() {
    return (
      <div>
        <CommentHead video={this.props.video} userImage={this.props.userImage} prependUserComment={this.prependUserComment} commentCount={this.state.commentCount} />
        <CommentBody commentData={this.state.commentData} userPosts={this.state.userPosts} />
      </div>
    );
  }
}

export default Comments;