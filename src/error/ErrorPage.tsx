import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <Container style={{ textAlign: 'center', paddingTop: '50px', minHeight: '100vh' }}>
      <Typography variant="h4" style={{ color: '#ff3d00', marginBottom: '20px' }}>
        Oops! Something went wrong...
      </Typography>
      <Typography variant="body1" style={{ color: '#616161', marginBottom: '40px' }}>
        {errorMessage}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        style={{
          backgroundColor: '#2196f3',
          color: '#fff',
          borderRadius: '5px',
          padding: '10px 20px',
          textDecoration: 'none',
          textTransform: 'uppercase',
        }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
