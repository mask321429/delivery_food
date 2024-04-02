import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchAddress from './serchAdress';

function Register() {
  const { control, handleSubmit, register } = useForm();
  const [lastParentObjectId, setLastParentObjectId] = useState(null);
  const [formEmpty, setFormEmpty] = useState(false);
  const [FormIfTrue, setFormIfTrue] = useState(false);

  const onSubmit = async (formData) => {
    // Validate and convert the birthDate to ISO format
    if (formData.birthDate) {
      const birthDate = new Date(formData.birthDate);
      if (!isNaN(birthDate)) {
        formData.birthDate = birthDate.toISOString();
      } else {
        console.error('Invalid birthDate:', formData.birthDate);
        return;
      }
    }

    formData.gender = formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1);

    formData.addressId = lastParentObjectId;
    console.log('Отправляемые данные:', formData);
    console.log('otvet', { lastParentObjectId });

    if (isFormEmpty(formData)) {
      setFormEmpty(true);
      return;
    }

    try {
      const response = await axios.post(
        'https://food-delivery.kreosoft.ru/api/account/register',
        formData,
      );
      if (response.status) {
        setFormIfTrue(true);
        setFormEmpty(false);
      }

      console.log('Успешно зарегистрировано:', response.data);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  const isFormEmpty = (formData) => {
    for (const key in formData) {
      if (formData[key] === null || formData[key] === undefined || formData[key] === '') {
        return true;
      }
    }
    return false;
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

      <form onSubmit={handleSubmit(onSubmit)} className="InReg">
        <div>
          <label>ФИО</label>
          <input name="fullName" {...register('fullName')} />
        </div>

        <div>
          <label>Пол</label>
          <select name="gender" {...register('gender')}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <div>
          <label>Мобильный телефон</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <InputMask mask="+7 (999) 999-99-99" {...field}>
                {(props) => <input {...props} />}
              </InputMask>
            )}
          />
        </div>

        <div>
          <label>Дата рождения</label>
          <input type="date" name="birthDate" {...register('birthDate')} />
        </div>

        <div>
          <label>Адрес проживания</label>
        </div>
        <SearchAddress
          onLastParentObjectIdChange={(newLastParentObjectId) =>
            setLastParentObjectId(newLastParentObjectId)
          }
          lastParentObjectId={lastParentObjectId}
        />

        <div>
          <label>Email</label>
          <input type="email" name="email" {...register('email')} />
        </div>

        <div>
          <label>Пароль</label>
          <input type="password" name="password" {...register('password')} />
        </div>

        {formEmpty && <p>Заполните все поля</p>}
        {FormIfTrue && <p>Вы Успешно зарегистрированы</p>}
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
