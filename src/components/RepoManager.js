import React, { useState } from 'react';
import axios from 'axios';

function RepoManager() {
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');

  const createWebhook = async () => {
    const token = localStorage.getItem('github_token');
    
    if (!token) {
      setError('No GitHub token found. Please authenticate first.');
      return;
    }

    try {
      const response = await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/hooks`,
        {
          name: 'web',
          active: true,
          events: ['pull_request'],
          config: {
            url: 'https://7413-106-210-176-67.ngrok-free.app/webhook', // Replace with your actual webhook URL
            content_type: 'json',
            insecure_ssl: '0'
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json'
          }
        }
      );
      console.log('Webhook created:', response.data);
      alert('Webhook created successfully!');
    } catch (error) {
      console.error('Error creating webhook:', error.response ? error.response.data : error);
      setError(`Error creating webhook: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h2>Manage Repository Webhook</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
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
    </div>
  );
}

export default RepoManager;