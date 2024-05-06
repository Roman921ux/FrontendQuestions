import { FormEvent, useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = observer(() => {
  const redirect = useNavigate()
  const { user } = useStores()
  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    setValue(prevState => ({
      ...prevState,
      [name]: inputValue
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    user.login(value)
      .then(res => {
        alert('Авторизованы')
        // window.localStorage.setItem('token', res)
        console.log('Login IN', res);
        redirect('/profile')
      })
      .catch(err => {
        console.log(err)
        alert('Ошибка при авторизации')
      })
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email' // Добавляем имя поля
          value={value.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <Input
          type='password'
          name='password' // Добавляем имя поля
          value={value.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <Button type='submit'>Авторизоваться</Button>
      </Form>
      <div>
        <Text>Еще не зарегистрированы?</Text>
        <NavLink to="/register">Зарегистрироваться</NavLink>
      </div>
    </Container>
  );
})

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.span`
  font-size: var(--large-Fs);
  font-weight: var(--large-W);
`;
const Text = styled.span`
  font-size: var(--small-Fs);
  font-weight: var(--large-W);
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Input = styled.input`
  width: 200px;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);
  appearance: none;

  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 10px;
  border-radius: 5px;`

const Button = styled.button`
margin-top: 15px;
  width: 223px;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);

  /* border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114); */
  padding: 10px 15px;
  border-radius: 5px;`