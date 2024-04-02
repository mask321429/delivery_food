import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';
import Header from './header.tsx';
import '../style/OrderHistory.css';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('https://food-delivery.kreosoft.ru/api/order', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при получении истории заказов:', error);
      }
    };

    fetchOrderHistory();
  }, [token]);

  const handleConfirmDelivery = async (orderId) => {
    try {
      await axios.post(
        `https://food-delivery.kreosoft.ru/api/order/${orderId}/status`,
        {},
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при подтверждении доставки:', error);
    }
  };

  const handleOrderClick = () => {
    navigate('/purchase');
  };

  return (
    <div>
      <Header />
      <h2>История заказов</h2>
      <button onClick={handleOrderClick}>Заказать еду из корзины</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Дата заказа: {order.orderTime.split('T')[0]}</p>

            <p>Статус: {order.status}</p>
            {order.status === 'InProcess' && (
              <button onClick={() => handleConfirmDelivery(order.id)}>Подтвердить доставку</button>
            )}
            {order.status !== 'InProcess' && (
              <>
                <p>Дата и время доставки: {order.deliveryTime.split('T').join(' ')}</p>

                <p>Цена: {order.price} рублей</p>
                <Link to={`/order/${order.id}`}>Показать информацию заказа</Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
