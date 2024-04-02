import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchAddress = ({ onLastParentObjectIdChange }) => {
  const [isAddressEnd, setIsAddressEnd] = useState(false);
  const [addressChain, setAddressChain] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [queryAddress, setQueryAddress] = useState('');
  const [lastParentobjectGuid, setLastParentOobjectGuid] = useState(null);

  const fetchAddress = (parentObjectId, query, onSuccess) => {
    const apiUrl = parentObjectId
      ? query
        ? `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${parentObjectId}&query=${query}`
        : `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${parentObjectId}`
      : query
      ? `https://food-delivery.kreosoft.ru/api/address/search?query=${query}`
      : `https://food-delivery.kreosoft.ru/api/address/search`;

    axios
      .get(apiUrl, {
        headers: {
          accept: 'application/json',
        },
      })
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  function handleInputChange(index, value) {
    setAddressChain(addressChain.slice(0, index));
    setQueryAddress(value);
    const objectId = addressChain[index - 1]?.objectId;
    fetchAddress(objectId, value, (data) => {
      setAddresses(data.slice(0, 5));
      if (queryAddress === '') {
        setIsAddressEnd(false);
      }
    });
  }

  useEffect(() => {
    if (isAddressEnd) {
      console.log('lastParentObjectId после окончания списка:', lastParentobjectGuid);
    }
  }, [lastParentobjectGuid, isAddressEnd]);

  function handleLastParentObjectIdChange(newLastParentObjectId) {
    onLastParentObjectIdChange(newLastParentObjectId);
  }

  function handleSelectAddress(address) {
    setAddressChain(addressChain.concat(address));
    fetchAddress(address.objectId, undefined, (data) => {
      setAddresses(data.slice(0, 5));
      setIsAddressEnd(data.length === 0);
    });
    setQueryAddress('');
    setLastParentOobjectGuid(address.objectGuid);
    handleLastParentObjectIdChange(address.objectGuid);
  }

  return (
    <>
      {addressChain.map((address, index) => (
        <div key={index}>
          <input
            type="text"
            value={address.text}
            onClick={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      {isAddressEnd ? null : (
        <>
          <input
            type="text"
            placeholder="Введите адрес"
            value={queryAddress}
            onChange={(e) => handleInputChange(addressChain.length, e.target.value)}
          />
          <ul>
            {addresses.map((address) => (
              <li key={address.objectId} onClick={() => handleSelectAddress(address)}>
                {address.text}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default SearchAddress;
