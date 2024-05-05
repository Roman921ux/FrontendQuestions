import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Main;

const Container = styled.div`
border: 2px solid rgba(1,1,1, 0.1); 
  padding: 15px;
  border-radius: 5px;
  width: 85%;
`;