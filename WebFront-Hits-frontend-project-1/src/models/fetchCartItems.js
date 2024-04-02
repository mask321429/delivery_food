import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';

export const fetchCartItems = async (setCartItems) => {
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
