import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {getURI} from '@lib';

const _Login = ({className, history, location, ...rest}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const res = await fetch(`${getURI()}/api/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({username, password}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (res.status === 200) {
        setIsLoggedIn(true);
        setMessage('Loading...');
        setTimeout(() => {
          history.push('/');
        }, 1500);
      } else if (res.status === 401) {
        const {error} = await res.json();
        setMessage(error);
      } else {
        throw new Error(res.error);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={className}>
      {
        !isLoggedIn ?
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Login</h1>
            <div id="login-username">
              <input
                type="username"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div id="login-password">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div id="login-submit">
              <input type="submit" value="Log in" />
            </div>
          </div>
        </form> :
        null
      }
      {
        message ?
        <div id="login-message">
          {message}
        </div> :
        null
      }
      {
        !isLoggedIn ?
        <div>
          <div id="login-forgot">
            <Link to="/request_credentials">Forgot username and password?</Link>
          </div>
        </div> :
        null
      }
    </div>
  )
};

const Login = styled(_Login)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #8fc7d8;
  #login-username {
    margin: 10px 0;
  };
  #login-password {
    margin: 10px 0;
  };
  #login-submit {
    margin: 10px 0;
  };
  #login-message {
    margin: 10px 0;
  };
  #new-user-register {
    margin: 10px 0;
  };
  #login-forgot {
    margin: 10px 0;
  }
`;

export default Login;