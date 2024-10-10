import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=repo,admin:repo_hook`;
  };

  return (
    <div>
      <h1>GitHub PR Review</h1>
      <button onClick={handleLogin}>Connect to GitHub</button>
      {localStorage.getItem('github_token') && (
        <Link to="/manage-repo">
          <button>Manage Repository Webhook</button>
        </Link>
      )}
    </div>
  );
}

export default Home;