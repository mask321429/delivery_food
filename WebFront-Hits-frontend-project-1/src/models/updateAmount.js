import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';

export const updateAmount = async (itemId, newAmount) => {
  const token = getToken();
  const updateUrl = `https://food-delivery.kreosoft.ru/api/basket/dish/${itemId}?increase=true`;

  try {
    const response = await axios.post(
      updateUrl,
      {},
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      console.error('Ошибка при обновлении количества на сервере');
    }
  } catch (error) {
    console.error('Ошибка при отправке запроса на сервер:', error);
  }
};
