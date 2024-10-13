import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Typography, Paper, Box } from '@mui/material';

function Callback() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      axios.post('https://github-pr-review-backend.onrender.com/github-oauth', { code })
        .then(response => {
          if (response.data.success) {
            navigate('/dashboard');
          } else {
            setError('Failed to authenticate with GitHub');
          }
        })
        .catch(err => {
          setError('An error occurred during authentication');
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('No code found in the callback URL');
      setLoading(false);
    }
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: 600, textAlign: 'center' }}>
        {loading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ marginTop: '1rem' }}>
              Authenticating with GitHub...
            </Typography>
          </>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : null}
      </Paper>
    </Box>
  );
}

export default Callback;