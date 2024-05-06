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
      <FlexBlock>
        <Title>Profile</Title>
        {/* <span>Token: {user.token ? 'true' : 'false'}</span> */}
        <Button onClick={() => user.logOut()}>Выйти</Button>
      </FlexBlock>
      <Block>
        <Text>FullName:</Text>
        <Title style={{ "marginLeft": "15px" }}>{user.user?.fullName}</Title>
      </Block>
      <Block>
        <Text>Email:</Text>
        <Title style={{ "marginLeft": "15px" }}>{user.user?.email}</Title>
      </Block>
    </Container>
  );
})

export default ProfilePage;

const Container = styled.div`
  
`;

const Button = styled.button`
  color: #fff;
`;

const FlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Block = styled.div`
margin-top: 25px;
margin-left: 30px;

  display: flex;
  flex-direction: column;
  /* gap: 5px; */
`;
const Title = styled.div`
  font-size: var(--large-Fs);
  /* margin-left: 15px; */
`;
const Text = styled.div`
  font-size: var(--small-Fs);
`;
