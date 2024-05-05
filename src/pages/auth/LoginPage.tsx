import { FormEvent, useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import { useNavigate } from 'react-router-dom';

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
      Login
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email' // Добавляем имя поля
          value={value.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type='password'
          name='password' // Добавляем имя поля
          value={value.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <button type='submit'>Авторизоваться</button>
      </form>
    </Container>
  );
})

export default LoginPage;

const Container = styled.div`
  
`;