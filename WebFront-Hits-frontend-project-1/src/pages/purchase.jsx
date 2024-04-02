import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';
import Header from './header.tsx';
import '../style/cart.css';
import { deleteItemS } from '../models/deleteItem.js';
import FoodOrderForm from '../models/FoodOrderForm.jsx';
function Purchase() {
  const [cartItems, setCartItems] = useState([]);
  const [isOrderFormVisible, setOrderFormVisible] = useState(false);

  const fetchCartItems = async () => {
    const token = getToken();
    const url = 'https://food-delivery.kreosoft.ru/api/basket';

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCartItems(response.data);
      } else {
        console.error('Network response was not ok');
      }
    } catch (error) {
      console.error('Ошибка при получении корзины:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const updateAmount = (itemId, newAmount) => {
    const token = getToken();
    const updateUrl = `https://food-delivery.kreosoft.ru/api/basket/dish/${itemId}?increase=true`;

    axios
      .post(
        updateUrl,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        if (response.status !== 200) {
          console.error('Ошибка при обновлении количества на сервере');
        } else {
          fetchCartItems();
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке запроса на сервер:', error);
      });
  };

  const decreaseAmount = (itemId) => {
    const token = getToken();
    const updateUrl = `https://food-delivery.kreosoft.ru/api/basket/dish/${itemId}?increase=true`;

    axios
      .delete(updateUrl, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.error('Ошибка при уменьшении количества на сервере');
        } else {
          fetchCartItems();
        }
      })
      .catch((error) => {
        console.error('Ошибка при отправке запроса на сервер:', error);
      });
  };

  const handleOrderClick = () => {
    setOrderFormVisible(true);
  };

  return (
    <div>
      <div>
        <Header />
        {isOrderFormVisible ? (
          <FoodOrderForm onClose={() => setOrderFormVisible(false)} />
        ) : (
          <>
            <h1>Корзина</h1>
            <button onClick={handleOrderClick}>Заказать еду из корзины</button>
          </>
        )}
      </div>
      <h1>Корзина</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="info">
              <h2>{item.name}</h2>
              <p>Цена: {item.price}</p>
              <div className="amount-container">
                <label>Количество:</label>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateAmount(item.id, e.target.value)}
                  className="amount-input"
                />
                <button onClick={() => updateAmount(item.id, item.amount + 1)}>↑</button>
                <button onClick={() => decreaseAmount(item.id)}>↓</button>
              </div>
              <p className="total-price">Итоговая цена: {item.totalPrice}</p>
              <button onClick={() => deleteItemS(item.id, cartItems, setCartItems)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Purchase;
