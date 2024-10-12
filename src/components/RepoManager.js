import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios to include credentials in requests
axios.defaults.withCredentials = true;

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
    try {
      const response = await axios.get(`${BACKEND_URL}/check-auth`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('github_token')}` }
      });
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };

  const createWebhook = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/create-webhook`, {
        repoOwner,
        repoName
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('github_token')}` }
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
        <button onClick={() => window.location.href = '/'}>Login with GitHub</button>
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
