import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import { useEffect } from 'react';

const ProfilePage = observer(() => {
  const { user } = useStores()

  useEffect(() => {
    user.geyUser()
  }, [])

  return (
    <Container>
      Profile
      <span>Token: {user.token ? 'true' : 'false'}</span>
      <button onClick={() => user.logOut()}>Выйти</button>
    </Container>
  );
})

export default ProfilePage;

const Container = styled.div`
  
`;