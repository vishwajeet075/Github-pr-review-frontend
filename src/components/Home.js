import React from 'react';
import { Button, Typography, Paper, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Home() {
  const handleConnect = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: 600, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          GitHub PR Review System
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Connect your GitHub account to start automatically reviewing pull requests using AI.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GitHubIcon />}
          onClick={handleConnect}
          sx={{
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s',
            },
          }}
        >
          Connect GitHub
        </Button>
      </Paper>
    </Box>
  );
}

export default Home;