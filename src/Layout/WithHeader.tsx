import { styled } from '@mui/material';
import { ReactNode } from 'react';
import PageHeader from './PageHeader';

const WithHeader = (element: ReactNode) => {
  return (
    <PageContainer>
      <PageHeader />
      {element}
    </PageContainer>
  );
};

const PageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export default WithHeader;
