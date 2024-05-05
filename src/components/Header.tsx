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
  border: 2px solid rgba(1,1,1, 0.1); 
  background-color: #ffffff; /* Цвет фона блока */
  /* box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2); Тень блока */
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 15%;
  padding: 15px;
`;

const Link = styled.div`
border: 2px solid rgba(1,1,1, 0.1); 

  /* width: 100%; */
  padding: 10px 0 10px 15px;
  border-radius: 5px;
`;