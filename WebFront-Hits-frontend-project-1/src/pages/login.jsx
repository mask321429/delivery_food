import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../accesTokan/token.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style/stylyForLogin.css';
function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigation = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://food-delivery.kreosoft.ru/api/account/login',
        data,
      );

      if (response.status === 200) {
        console.log('Успешно вошли:', response);
        saveToken(response.data.token);
        navigation(`/`);
      } else {
        console.log('Данные заполнены неверно.');
        if (response.data && response.data.error) {
          setErrorMessage(response.data.error);
        }
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email или пароль неверны');
      }
    }
  };

  return (
    <div>
      <header>
        <div className="header-container">
          <span className="logo">Food Delivery</span>
          <ul className="InfoOfTop">
            <Link to="/">
              <li>Меню</li>
            </Link>
            <Link to="/login/">
              <li>Вход</li>
            </Link>
            <Link to="/registration/">
              <li>Регистрация</li>
            </Link>
          </ul>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Авторизация</h1>
        <div>
          <label>Email</label>
          <input {...register('email', { required: true })} type="email" name="email" />
          {errors.email && <span>Поле "Email" обязательно для заполнения</span>}
        </div>

        <div>
          <label>Пароль</label>
          <input {...register('password', { required: true })} type="password" name="password" />
          {errors.password && <span>Поле "Пароль" обязательно для заполнения</span>}
        </div>

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        <button type="submit">Войти в аккаунт</button>
      </form>
    </div>
  );
}

export default Login;
