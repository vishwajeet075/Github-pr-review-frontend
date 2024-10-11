// src/components/Callback.js
import React, { useEffect } from 'react';
import axios from 'axios';

function Callback() {
  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await axios.post('https://9e59b599494667379235d6a2c56cb07b.serveo.net/github-oauth', { code },
            { 
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              }
            });
          const { access_token } = response.data;

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
