import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://github-pr-review-backend.onrender.com';

function RepoManager() {
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const githubToken = localStorage.getItem('github_token');
    if (githubToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const createWebhook = async () => {
    try {
      await axios.post(`${BACKEND_URL}/create-webhook`, {
        repoOwner,
        repoName
      });
      alert('Webhook created successfully!');
    } catch (error) {
      console.error('Error creating webhook:', error);
      setError(`Error creating webhook: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Manage Repository Webhook</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isAuthenticated ? (
        <p>Please login via the home page to manage repository webhooks.</p>
      ) : (
        <>
          <input 
            type="text" 
            placeholder="Repository Owner" 
            value={repoOwner} 
            onChange={(e) => setRepoOwner(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Repository Name" 
            value={repoName} 
            onChange={(e) => setRepoName(e.target.value)} 
          />
          <button onClick={createWebhook}>Create Webhook</button>
        </>
      )}
    </div>
  );
}

export default RepoManager;
