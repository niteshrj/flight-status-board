import { AppBar, Toolbar, Typography } from '@mui/material';
import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';

function PageHeader() {
  return (
    <AppBar sx={{ position: 'static', background: '#5DADE2' }}>
      <Toolbar sx={{ ml: 2 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: 'white', justifyContent: 'center', display: 'flex', fontWeight: 'bold' }}
        >
          <AirplanemodeActiveRoundedIcon fontSize={'large'} sx={{ mr: 2 }} />
          Flight Status Board
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default PageHeader;
