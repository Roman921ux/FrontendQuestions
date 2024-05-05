import { FormEvent, useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../../root-store-context';
import { useNavigate } from 'react-router-dom';


const RegisterPage = observer(() => {
  const redirect = useNavigate()
  const { user } = useStores()
  const [value, setValue] = useState({
    email: '',
    password: '',
    fullName: ''
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
    console.log('register', value)
    user.register(value)
      .then(res => {
        console.log(res)
        alert('Зарегистрированы')
        redirect('/profile')
      })
      .catch(err => {
        console.log(err)
        alert('Ошибка при регистрации')
      })
  };
  return (
    <Container>
      Register
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
        <input
          type='text'
          name='fullName' // Добавляем имя поля
          value={value.fullName}
          onChange={handleChange}
          placeholder='fullName'
        />
        <button type='submit'>Авторизоваться</button>
      </form>
    </Container>
  );
})

export default RegisterPage;

const Container = styled.div`
  
`;