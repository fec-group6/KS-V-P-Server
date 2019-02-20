import styled from 'styled-components';
import Reply from './reply.jsx';
import React from 'react';

const Toggle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 2px;
  line-height: 16px;
  cursor: pointer;
`;

class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: false
    };
    this.showReplies = this.showReplies.bind(this);
  }

  showReplies() {
    this.setState({ showReplies: !this.state.showReplies });
  }
  
  render() {
    let allReplies = [];
    let replyCount = this.props.replies.length;
    for (let i = 0; i < replyCount; i++) {
      let data = this.props.replies[i];
      allReplies.push(<Reply image={data.image} username={data.username} commentDate={data.commentDate} likes={data.likes} dislikes={data.dislikes} text={data.text} />);
    }
    if (this.state.showReplies) {
      return (
        <div>
          <Toggle onClick={this.showReplies}>Hide replies ⋀</Toggle>
          {allReplies}
        </div>
      );
    } else {
      return (
        <div>
          <Toggle onClick={this.showReplies}>{`View ${replyCount} replies ⋁`}</Toggle>
        </div>
      );
    }
  }
  
  // for (let i = 0; i < props.userPosts.length; i++) {
  //   let userPostData = props.userPosts[i];
  //   comments.push(<Comment image={userPostData.image} username={userPostData.username} commentDate={userPostData.commentDate} likes={userPostData.likes} dislikes={userPostData.dislikes} text={userPostData.text} replies={userPostData.replies} />);
  // }
  
}

export default Replies;