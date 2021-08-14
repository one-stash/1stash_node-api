import React, {useState} from 'react';
import styled from 'styled-components';

import Header from './Header';
import Body from './Body';

const _Main = ({className}) => {
  return (
    <div className={className}>
      <Header />
      <Body />
    </div>
  )
}
  
const Main = styled(_Main)`
  background-color: #8fc7d8;
  height: 100vh;
`;

export default Main;