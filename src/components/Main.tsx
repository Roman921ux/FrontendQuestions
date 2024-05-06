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
  /* border: var(--border-color);
  box-shadow: var(--box-shadow);
  border-radius: 5px; */

  padding: 10px;
  width: 85%;
  height: 100%;
  /* border: 1px solid blue; */
`;