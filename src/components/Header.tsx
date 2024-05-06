import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useStores } from '../root-store-context';
import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  const { user } = useStores()
  return (
    <Container>
      <NavLink to="/profile" style={{ "color": "inherit" }}><Link>Профиль</Link></NavLink>
      <NavLink to="/" style={{ "color": "inherit" }}><Link>Вопросы</Link></NavLink>
      <NavLink to="/learning" style={{ "color": "inherit" }}><Link>Мои Вопросы</Link></NavLink>
      {user.user?.role === 'admin' && <NavLink to="/question" style={{ "color": "inherit" }}><Link>Создать Вопрос</Link></NavLink>}
    </Container>
  );
})

export default Header;

const Container = styled.div`
  /* border-radius: 5px;
  border: var(--border-color);
  box-shadow: var(--box-shadow); */

  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 15%;
  padding: 10px;
`;


const Link = styled.button`
  padding: 5px 0 5px 15px;
  border: var(--border-color);
  /* box-shadow: var(--box-shadow); */
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: self-end;
  //
  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  font-size: var(--middle-Fs);
  font-weight: var(--middle-W);
`;