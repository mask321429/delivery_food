import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {

  return (
    <header>
      <div className="header-container">
        <span className="logo">Food Delivery</span>
        <ul className="InfoOfTop">
          <Link to="/">
            <li>Меню</li>
          </Link>
          <Link to="/zakazi">
            <li>Заказы</li>
          </Link>
          <Link to="/register">
            <li>Профиль</li>
          </Link>
        </ul>       

        
      </div>
    </header>
  );
}

export default Header;
