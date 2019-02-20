import styled from 'styled-components';
import React from 'react';
import CommentForm from './commentForm.jsx';

const CommentHead = (props) => {

  const Container = styled.div`
    height: 30px;
    margin-top: 16px;
    margin-bottom: 16px;
    border-top: 0.5px solid rgba(17, 17, 17, 0.6);
    padding-top: 24px;
    font-size: 16px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    `;

  const CommentCount = styled.div`
    display: inline-block;
    margin-right: 40px;
  `;

  const SortContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `;

  const SortIcon = styled.img`
    display: inline-block;
    max-height: 100%;
    object-fit: cover;
    margin-right: 5px;
  `;

  const SortText = styled.div`
    display: inline-block;
    font-size: 14px;
    color: rgb(96, 96, 96);
  `;
  
  return (
    <div>
      <Container>
        <CommentCount>{`${props.commentCount} Comments`}</CommentCount>
        <SortContainer>
          <SortIcon src="./images/sort_grey_48x48.png"></SortIcon>
          <SortText>SORT BY</SortText>
        </SortContainer>
      </Container>
      <CommentForm video={props.video} prependUserComment={props.prependUserComment} userImage={props.userImage} />
    </div>
  );
};

export default CommentHead;