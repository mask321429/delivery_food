import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header.tsx';
import '../style/menu-item-detail.css';

function MenuItemDetail() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);

  useEffect(() => {
    fetch(`https://food-delivery.kreosoft.ru/api/dish/${id}`)
      .then((response) => response.json())
      .then((data) => setMenuItem(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  if (!menuItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="menu-item-detail">
        <h2>{menuItem.name}</h2>
        <img src={menuItem.image} alt={menuItem.name} />
        <p className="description">Description: {menuItem.description}</p>
        <p className="price">Price: {menuItem.price}</p>
      </div>
    </div>
  );
}

export default MenuItemDetail;
