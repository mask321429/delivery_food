export const addToCart = async (dishId, token) => {
  const url = `https://food-delivery.kreosoft.ru/api/basket/dish/${dishId}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('Запрос отправлен');
      return true;
    } else {
      console.error('Не отправился');
      return false;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};
