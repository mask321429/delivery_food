import React from "react";

import { Link } from 'react-router-dom';

interface VhodeProps {
    someProp: string;
    anotherProp: number;
  }
  
  const Vhode: React.FC<VhodeProps> = (props) => {
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
   
    )

    

}

  

export default Vhode;