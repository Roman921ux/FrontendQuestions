import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AuthRequire = observer(({ children }: Props) => {
  const { user } = useStores();

  if (!user.token) {
    return <Navigate to="/login" />
  }

  return (
    <Container>
      {children}
    </Container>
  );
})

export default AuthRequire;

const Container = styled.div`
  
`;