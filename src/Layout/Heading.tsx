import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const Heading = (text: any) => {
  return <HeadingStyles>{text}</HeadingStyles>;
};

const HeadingStyles = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  marginTop: '20px',
}));
