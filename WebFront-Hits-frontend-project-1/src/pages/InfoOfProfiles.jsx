import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../accesTokan/token.ts';
import { saveToken } from '../accesTokan/token.ts';
import '../style/infoOfProfiles.css';
import SearchAddress from './serchAdress.jsx';
import { useNavigate } from 'react-router-dom';
function InfoOfProfiles() {
  const [profileData, setProfileData] = useState(null);
  const [addressText, setAddressText] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [lastParentObjectId, setLastParentObjectId] = useState(null);
  const [originalBirthDate, setOriginalBirthDate] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    console.log(lastParentObjectId);
    if (token) {
      axios
        .get('https://food-delivery.kreosoft.ru/api/account/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileData(response.data);
          setEditedProfile(response.data);
          getAddress(response.data.address);
          setOriginalBirthDate(response.data.birthDate);
          setOriginalAddress(response.data.address);
        })
        .catch((error) => {
          console.error('Ошибка при запросе данных: ', error);
          saveToken(null);
          navigate('/registration/');
        });
    } else {
      console.error('Токен не найден в localStorage.');
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    const updatedProfile = {
      fullName: editedProfile.fullName,
      birthDate: originalBirthDate,
      gender: editedProfile.gender,
      address: originalAddress,
      phoneNumber: editedProfile.phoneNumber,
    };

    axios
      .put('https://food-delivery.kreosoft.ru/api/account/profile', updatedProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Профиль успешно обновлен:', response.data);

        setProfileData({ ...profileData, ...editedProfile });

        getAddress(updatedProfile.addressId);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении профиля: ', error);
      });
  };

  const handleInputChange = (e) => {
    setEditedProfile({
      ...editedProfile,
      [e.target.name]: e.target.value,
    });
  };
  const getAddress = (addressGuid = lastParentObjectId) => {
    axios
      .get(`https://food-delivery.kreosoft.ru/api/address/chain?objectGuid=${addressGuid}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setAddressText(response.data.map((item) => item.text).join(', '));
      })
      .catch((error) => {
        console.error('Ошибка при запросе адреса: ', error);
      });
  };

  return (
    <div className="info-container">
      {profileData ? (
        <div>
          <h2>Информация о профиле:</h2>
          {isEditing ? (
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Имя"
                value={editedProfile.fullName}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="birthDate"
                value={editedProfile.birthDate}
                onChange={handleInputChange}
              />
              <select name="gender" value={editedProfile.gender} onChange={handleInputChange}>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </select>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Номер телефона"
                value={editedProfile.phoneNumber}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
              />

              <SearchAddress
                onLastParentObjectIdChange={(newLastParentObjectId) =>
                  setLastParentObjectId(newLastParentObjectId)
                }
                lastParentObjectId={lastParentObjectId}
              />
              <button onClick={handleSaveClick}>Сохранить</button>
            </div>
          ) : (
            <div>
              <p>
                <strong>Имя:</strong> {profileData.fullName}
              </p>
              <p>
                <strong>Дата рождения:</strong> {profileData.birthDate.split('T')[0]}
              </p>
              <p>
                <strong>Пол:</strong> {profileData.gender}
              </p>
              <p>
                <strong>Адрес:</strong> {addressText}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong>Номер телефона:</strong> {profileData.phoneNumber}
              </p>

              <p>
                <strong>Email:</strong> {profileData.email}
              </p>

              <button onClick={handleEditClick}>Изменить данные</button>
            </div>
          )}
        </div>
      ) : (
        <p className="loading">Загрузка данных...</p>
      )}
    </div>
  );
}

export default InfoOfProfiles;
