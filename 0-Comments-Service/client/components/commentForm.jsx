import styled from 'styled-components';
import React from 'react';
import { commentPost } from '../clientHelpers';

var AddCommentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  padding-top: 8px;
  align-items: flex-start;
`;

var ImageContainer = styled.div`
  display: inline-block;
  height: 40px;
  width: 40px;
  margin-left: 4px;
  margin-right: 16px;
  flex-grow: 0;
  flex-shrink: 0;
`;

var UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  object-fit: cover;
`;

var NewComment = styled.form`
  width: 100%;
  max-width: 828px;
`;

var Underline = styled.div`
  background-color: rgba(17, 17, 17, 0.6);
  height: 2px;
  display: inline-block;
  transform: scale(0, 1);
  transition: all 0.3s linear;
  width: 100%
`;

var CommentInput = styled.input`
  display: block;
  position: relative;
  margin-bottom: -10px;
  min-width: 100%;
  outline: none;
  border: none;
  border-bottom: 0.5px solid rgba(17, 17, 17, 0.6);
  line-height: 21px;
  color: rgba(17, 17, 17, 0.6);
  cursor: text;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  &:focus {
    color: rgb(10, 10, 10);
  }
  &:focus ~ ${Underline} {
    transform: scale(1);
  }
`;

var Submissions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 5px;
  width: 100%
`;

var CancelSubmit = styled.input`
  font-size: 14px;
  font-weight: 500px;  
  border: none;
  width: 100px;
  height: 36px;
  margin: 0 0 0 0;
  color: rgb(96, 96, 96);
  letter-spacing: .007px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

var CommentSubmit = styled.input`
  font-size: 14px;
  font-weight: 500px;
  border: none;
  width: 100px;
  height: 36px;
  margin: 0 0 0 8px;
  background-color: rgb(6, 95, 212);
  color: rgb(255, 255, 255);
  letter-spacing: .007px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      value: ''
    };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    const now = new Date();
    const nowAsString = now.toUTCString();
    commentPost('testUser', this.props.video, 0, this.state.value, (data, status) => {
      console.log(status);
    }, (err, errDesc) => {
      console.log(err, errDesc);
    });
    let userComment = {
      id: null,
      username: 'testUser',
      text: this.state.value,
      commentDate: nowAsString,
      likes: 0,
      dislikes: 0,
      image: this.props.userImage,
      replies: []
    };
    this.props.prependUserComment(userComment);
    this.setState({ value: '' });
    event.preventDefault();
  }

  handleCancel() {
    this.setState({
      focus: false,
      value: ''
    });
  }

  onFocus() {
    this.setState({
      focus: true
    });
  }

  onBlur() {
    this.setState({
      focus: false
    });
  }

  render() {
    return (
      <AddCommentContainer>
        <ImageContainer>
          <UserImage src={this.props.userImage}></UserImage>
        </ImageContainer>
        <NewComment onSubmit={this.handleSubmit} onFocus={this.onFocus} >
          <CommentInput type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add a public comment..."></CommentInput>
          <Underline></Underline>
          {this.state.focus &&
            <Submissions>
              <CancelSubmit onClick={this.handleCancel} readOnly value="CANCEL"></CancelSubmit>
              <CommentSubmit type="submit" readOnly value="COMMENT" />
            </Submissions>
          }
        </NewComment>
      </AddCommentContainer>
    );
  }
}

export default CommentForm;