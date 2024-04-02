import { Link, useParams, useNavigate } from 'react-router-dom';
import { saveToken, getToken } from '../accesTokan/token.ts';
import axios from 'axios';
import InfoOfProfiles from './InfoOfProfiles.jsx';

function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (getToken()) {
        const config = {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json',
          },
        };
        await axios.post('https://food-delivery.kreosoft.ru/api/account/logout', {}, config);
        saveToken(null);
        navigate('/');
      } else {
        console.error('Токен не найден в локальном хранилище.');
      }
    } catch (error) {
      console.error('Ошибка выхода из аккаунта:', error);
    }
  };

  return (
    <div>
      <header>
        <div className="header-container">
          <span className="logo">Food Delivery</span>
          <ul className="InfoOfTop">
            <Link to="/">
              <li>Меню</li>
            </Link>
            <Link to="/order/">
              <li>Заказы</li>
            </Link>
            <Link onClick={handleLogout}>
              <li>Выйти из аккаунта</li>
            </Link>
          </ul>
        </div>
      </header>

      <div className="ProfileContent">
        <InfoOfProfiles />
      </div>
    </div>
  );
}

export default Profile;
