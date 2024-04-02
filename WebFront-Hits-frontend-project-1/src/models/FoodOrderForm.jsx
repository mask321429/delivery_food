import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';
import SearchAddress from '../pages/serchAdress.jsx';

const FoodOrderForm = ({ onClose }) => {
  const [deliveryTime, setDeliveryTime] = useState('');
  const [lastParentObjectId, setLastParentObjectId] = useState(null);
  const [minAllowableDeliveryTime, setMinAllowableDeliveryTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const token = getToken();

  useEffect(() => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 1);
    setMinAllowableDeliveryTime(currentTime);
  }, []);

  const handleSubmit = () => {
    const localTime = new Date(deliveryTime);

    if (localTime < minAllowableDeliveryTime) {
      setErrorMessage(
        'Выбранное время доставки должно быть не менее чем через 1 час от текущего времени.',
      );
      return;
    }

    localTime.setHours(localTime.getHours() + 7);

    axios
      .post(
        'https://food-delivery.kreosoft.ru/api/order',
        {
          deliveryTime: localTime.toISOString(),
          addressId: lastParentObjectId,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error('Ошибка при заказе еды:', error);
      });
  };

  return (
    <div>
      <h2>Форма заказа еды</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <label>
        Дата и время доставки:
        <input
          type="datetime-local"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
        />
      </label>
      <br />
      <SearchAddress
        onLastParentObjectIdChange={(newLastParentObjectId) =>
          setLastParentObjectId(newLastParentObjectId)
        }
        lastParentObjectId={lastParentObjectId}
      />
      <br />
      <button onClick={handleSubmit}>Заказать еду</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default FoodOrderForm;
