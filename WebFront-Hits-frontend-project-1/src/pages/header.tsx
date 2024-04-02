import React from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../accesTokan/token.ts';
import '../style/header.css'; 

const Header: React.FC = () => {
  
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo">
          Food Delivery
        </Link>
        <ul className="InfoOfTop">
          <Link to="/">
            <li>Меню</li>
          </Link>
          <Link to="/orders/">
            <li>Заказы</li>
          </Link>
          <Link to="/cart/">
            <li>Корзина</li>
          </Link>
          {getToken() !== "null" ? (
            <Link to="/profile/">
              <li>Профиль</li>
            </Link>
          ) : (
            <Link to="/registration/">
              <li>Регистрация</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
