import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Snackbar,
  Box
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Dashboard() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://github-pr-review-backend.onrender.com/create-webhook', { owner, repo });
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError('Failed to create webhook');
      }
    } catch (err) {
      setError('An error occurred while creating the webhook');
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: 600 }}>
        <Typography variant="h5" gutterBottom>
          Set Up PR Review
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label="Repository Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Repository Name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
            Create Webhook
          </Button>
        </Box>
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">
            Webhook created successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default Dashboard;