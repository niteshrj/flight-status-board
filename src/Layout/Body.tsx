import { styled } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Body({ children }: Props) {
  return <BodyContainer>{children}</BodyContainer>;
}

const BodyContainer = styled('div')({
  background: '#e2e7ea',
  flex: 1,
});

export default Body;
