import React, { useState } from 'react';
import axios from 'axios';

function RepoManager() {
  const [repoOwner, setRepoOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('github_token');

  const checkAndCreateWebhook = async () => {
    if (!token) {
      setError('No GitHub token found. Please authenticate first.');
      return;
    }
  
    try {
      /*const response = await axios.post('https://github-pr-review-backend.onrender.com/check-webhook', {
        repoOwner,
        repoName,
        webhookUrl: 'https://github-pr-review-backend.onrender.com/webhook',
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const { webhookExists } = response.data;
  
      if (webhookExists) {
        alert('Webhook already exists.');
      } else {
        await createWebhook();
      }*/
     await createWebhook();
    } catch (error) {
      console.error('Error checking existing webhooks:', error.response ? error.response.data : error);
      setError(`Error checking webhooks: ${error.message}`);
    }
  };

  const createWebhook = async () => {
    try {
      const response = await axios.post(
        `https://api.github.com/repos/${repoOwner}/${repoName}/hooks`,
        {
          name: 'web',
          active: true,
          events: ['pull_request'],
          config: {
            url: 'https://github-pr-review-backend.onrender.com/webhook',
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={checkAndCreateWebhook}>Create Webhook</button>
    </div>
  );
}

export default RepoManager;
