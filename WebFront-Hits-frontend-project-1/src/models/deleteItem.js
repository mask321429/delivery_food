import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';

export const deleteItemS = async (itemId, cartItems, setCartItems) => {
  const token = getToken();
  const deleteUrl = `https://food-delivery.kreosoft.ru/api/basket/dish/${itemId}?increase=false`;

  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const updatedItems = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedItems);
    } else {
      console.error('Ошибка при удалении элемента корзины');
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
  }
};
