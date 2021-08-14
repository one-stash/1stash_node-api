import React, {useState} from 'react';
import styled from 'styled-components';

import BuildsList from './BuildsList';
import ImacConnector from './ImacConnector';
import Upload from './Upload';

const _Body = ({className}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isBuildSelected, setIsBuildSelected] = useState(false);
  return (
    <div className={className}>
      <BuildsList
        setIsBuildSelected={setIsBuildSelected}
      />
      <ImacConnector
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <Upload
        isBuildSelected={isBuildSelected}
        isConnected={isConnected}
      />
    </div>
  )
}
  
const Body = styled(_Body)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 54px);
`;

export default Body;