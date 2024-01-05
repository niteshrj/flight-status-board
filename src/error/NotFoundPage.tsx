import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        The page you are looking doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" style={{ marginTop: '20px' }}>
        Go to Home
      </Button>
    </Container>
  );
};
