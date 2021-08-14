import React, {useState} from 'react';
import styled from 'styled-components';

import {getURI} from '@lib';

const _Upload = ({className, isBuildSelected, isConnected}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [message, setMessage] = useState();

  async function upload() {
    try {
      const build = document.getElementById('build-version').value;
      const res = await fetch(`${getURI()}/api/upload`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({build}),
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
      <button
        onClick={upload}
        disabled={!isBuildSelected || !isConnected || isUploading}
      >
        Upload
      </button>
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

const Upload = styled(_Upload)`
  height: 200px;
  width: 200px;
  border: 1px solid;
  margin: 0 10px;
`;

export default Upload;