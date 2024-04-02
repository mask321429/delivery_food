import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../accesTokan/token.ts';
import Header from './header.tsx';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const token = getToken();
  const [addressText, setAddressText] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`https://food-delivery.kreosoft.ru/api/order/${id}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const orderWithLocalTime = {
          ...response.data,
          orderTime: new Date(response.data.orderTime).toLocaleString('ru-RU', {
            timeZone: 'Asia/Novosibirsk',
          }),
        };

        getAddress(orderWithLocalTime.address);
        setOrder(orderWithLocalTime);
      } catch (error) {
        console.error('Ошибка при получении информации о заказе:', error);
      }
    };

    fetchOrderDetails();
  }, [id, token]);

  const getAddress = (addressGuid) => {
    axios
      .get(`https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=${addressGuid}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setAddressText(response.data.map((item) => item.text).join(', '));
      })
      .catch((error) => {
        console.error('Ошибка при запросе адреса: ', error);
      });
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <h2>Информация о заказе</h2>
      <p>Дата и время доставки: {order.deliveryTime.split('T').join(' ')}</p>
      <p>Дата заказа: {order.orderTime.split(',')[0]}</p>
      <p>Статус: {order.status}</p>
      <p>Сумма заказа: {order.price} рублей</p>
      <h3>Блюда:</h3>
      <ul>
        {order.dishes.map((dish) => (
          <li key={dish.id}>
            <img src={dish.image} alt={dish.name} width="100" height="100" />
            <p>Название: {dish.name}</p>
            <p>Цена: {dish.price} рублей</p>
            <p>Количество: {dish.amount}</p>
            <p>Итоговая цена: {dish.totalPrice} рублей</p>
          </li>
        ))}
      </ul>
      <p>Адрес доставки: {addressText}</p>
    </div>
  );
};

export default OrderDetails;
