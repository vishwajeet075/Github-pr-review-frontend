import React, { useEffect } from 'react';
import axios from 'axios';

function Callback() {
  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/github-oauth`, { code }, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
          });
          
          const { access_token } = response.data;

          // Save the token to local storage and redirect
          localStorage.setItem('github_token', access_token);
          window.location.href = '/';
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
    };

    fetchToken();
  }, []);

  return <div>Processing GitHub login...</div>;
}

export default Callback;
