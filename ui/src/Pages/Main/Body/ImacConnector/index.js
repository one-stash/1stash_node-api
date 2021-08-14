import React, {useState} from 'react';
import styled from 'styled-components';

import {getURI} from '@lib';

const _ImacConnector = ({className, isConnected, setIsConnected}) => {
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();

  function handleHostChange(event) {
    setHost(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function connect() {
    try {
      const res = await fetch(`${getURI()}/api/connectToImac`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({host, username, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (res.status === 200) {
        const {error} = await res.json();
        if (error) {
          setMessage(error);
        } else {
          setMessage(null);
          setIsConnected(true);
        } 
      } else if (res.status === 401) {
        const {error} = await res.json();
        setMessage(error);
      } else {
        throw new Error('Unknown error');
      }
    }
    catch(error) {
      setMessage(error.message);
    }
  }

  async function disconnect() {
    try {
      const res = await fetch(`${getURI()}/api/disconnectFromImac`, {
        credentials: 'include'
      });
  
      if (res.status === 200) {
        const {error} = await res.json();
        if (error) {
          setMessage(error);
        } else {
          setUsername('');
          setPassword('');
          setMessage(null);
          setIsConnected(false); 
        } 
      } else if (res.status === 401) {
        const {error} = await res.json();
        setMessage(error);
      } else {
        throw new Error('Unknown error');
      }
    }
    catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <div className={className}>
      <div>
        Upload to:
      </div>
      <div>
        <label>Host name or IP</label>
        <input type="text" value={host} onChange={handleHostChange} />
      </div>
      {
        !isConnected ?
        <div>
          <div>
            <label>Username</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label>Password</label>
            <input type="text" value={password} onChange={handlePasswordChange} />
          </div>
        </div> :
        null
      }
      <div>
        {
          !isConnected ?
          <button onClick={connect}>
            Connect
          </button> :
          <button onClick={disconnect}>
            Disconnect
          </button>
        }
      </div>
      {
        message ?
        <div id="connect-message">
          {message}
        </div> :
        null
      }
    </div>
  )
}

const ImacConnector = styled(_ImacConnector)`
  height: 200px;
  width: 200px;
  border: 1px solid;
  margin: 0 10px;
`;

export default ImacConnector;