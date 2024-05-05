import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}
const RoleRequire = observer(({ children }: Props) => {
  const { user } = useStores()

  if (user.user?.role === 'user') {
    alert('Вы не админ')
    return <Navigate to="/" />
  } else if (!user.user) {
    return <Navigate to="/login" />
  }
  return (
    <Container>
      {children}
    </Container>
  );
})

export default RoleRequire;

const Container = styled.div`
  
`;