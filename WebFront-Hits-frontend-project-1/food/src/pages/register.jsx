import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="header-container">
            <span className="logo">Food Delivery</span>
            <ul className="InfoOfTop">
              <Link to="/">
                <li>Меню</li>
              </Link>
              <Link to="/vhode">
                <li>Вход</li>
              </Link>
              <Link to="/register">
                <li>Регистрация</li>
              </Link>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

export default Register;
