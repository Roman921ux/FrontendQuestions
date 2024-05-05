import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useStores } from '../root-store-context';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  const { user } = useStores()
  return (
    <Container>
      <NavLink to="/profile">Профиль</NavLink>
      <NavLink to="/">Вопросы</NavLink>
      <NavLink to="/learning">Изучаю</NavLink>
      {user.user?.role === 'admin' && <NavLink to="/question">Создать Вопрос</NavLink>}
    </Container>
  );
})

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 15%;
  border: 1px solid red;
`;