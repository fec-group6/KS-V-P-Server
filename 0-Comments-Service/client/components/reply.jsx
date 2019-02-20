import styled from 'styled-components';
import React from 'react';
import { timeSince } from '../clientHelpers.js';

var Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  padding-top: 16px;
  align-items: top;
`;

var ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

var ImageContainer = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
  margin-left: 4px;
  margin-right: 16px;
  flex-grow: 0;
  flex-shrink: 0;
`;

var Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

var NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

var ReplyText = styled.div`
  color: rgb(17, 17, 17);
  line-height: 20px;
  margin-right: 10px;
  white-space: pre-wrap;
  margin-bottom: 6px;
`;

var ReplyingUser = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
  line-height: 18px;
`;

var PublishDate = styled.div`
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
`;

var Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  height: 26px;
`;

const LikeDislike = styled.img`
  display: inline-block;
  max-height: 60%;
  object-fit: cover;
  margin-right: 5px;
  cursor: pointer;
`;

var LikeCount = styled.div`
  display: inline-block;
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  width: 50px;
`;

var ReplyButton = styled.div`
  display: inline-block;
  margin-left: 20px;
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true
    };
  }

  render() {
    return (
      <Container>
        <ImageContainer>
          <Image src={this.props.image}></Image>
        </ImageContainer>
        <ReplyContainer>
          <NameAndDate>
            <ReplyingUser>{this.props.username}</ReplyingUser>
            <PublishDate>{timeSince(this.props.commentDate)}</PublishDate>
          </NameAndDate>
          <ReplyText>{this.props.text}</ReplyText>
          <Actions>
            <LikeDislike src="./images/thumb_up_grey_48x48.png"></LikeDislike>
            <LikeCount>{this.props.likes.toLocaleString()}</LikeCount>
            <LikeDislike src="./images/thumb_down_grey_48x48.png"></LikeDislike>
            <ReplyButton>REPLY</ReplyButton>
          </Actions>
        </ReplyContainer>
      </Container>
    );
  }
}

export default Reply;