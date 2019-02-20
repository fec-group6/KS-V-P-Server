import styled from 'styled-components';
import React from 'react';

var ScrollButtons = (props) => {

  var ScrollButton = styled.button`
  position: absolute;
  bottom: 45px;
  font-size: 28px;
  color: rgb(144, 144, 144);
  background-color: rgb(238, 238, 238);
  box-shadow: 0 3px 10px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

  var Container = styled.div`
    position: relative;
  `;

  var leftScrollButton = <ScrollButton style={{left: '-10px'}} onClick={() => props.scroll('left')}>{'‹'}</ScrollButton>;
  var rightScrollButton = <ScrollButton style={{right: '-10px'}} onClick={() => props.scroll('right')}>{'›'}</ScrollButton>;
  var buttons = [];

  if (props.canScrollLeft) {
    buttons.push(leftScrollButton);
  }
  if (props.canScrollRight) {
    buttons.push(rightScrollButton);
  }

  return (
    <Container>
      {buttons}
    </Container>
  );
};

export default ScrollButtons;