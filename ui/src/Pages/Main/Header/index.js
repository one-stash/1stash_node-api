import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {getURI} from '@lib';

const _Header = ({className}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [message, setMessage] = useState();
  const history = useHistory();

  const handleLogout = event => {
    event.preventDefault();
    fetch(`${getURI()}/api/logout`, {
      credentials: 'include'
    })
      .then(res => {
        setIsLoggedIn(false);
        setMessage('Logging out...');
        setTimeout(() => {
          history.push('/login');
        }, 1500)
      })
  }

  return (
    <div className={className}>
      <div className="header-logo">
        __IMAC__
      </div>
      <div className="header-title">
        IMAC UPLOAD SERVICE
      </div>
      <div className="header-logout">
        {
          isLoggedIn ?
          <button onClick={handleLogout}>Log out</button> :
          null
        }
        {
          message ?
          <div>{message}</div> :
          null
        }
      </div>
    </div>
  )
}

const Header = styled(_Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 12px;

  .header-title {
    font-size: 40px;
  }
`;

export default Header;