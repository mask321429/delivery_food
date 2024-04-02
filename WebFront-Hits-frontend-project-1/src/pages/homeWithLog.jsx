import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import Header from './header.tsx';
import { Link } from 'react-router-dom';
import { addToCart } from '../models/addToCart.jsx';
import { getToken } from '../accesTokan/token.ts';
import StarRating from '../models/StarRating.js';
import '../style/homeWithLog.css';
import listImage from '../img/i.webp';
import { useNavigate } from 'react-router-dom';

function HomeWithLog() {
  const [categories, setCategories] = useState([]);
  const [vegetarian, setVegetarian] = useState(false);
  const [sorting, setSorting] = useState(undefined);
  const [dishes, setDishes] = useState([]);
  const [pagination, setPagination] = useState({ size: 5, count: 0, current: 1 });
  const token = getToken();

  useEffect(() => {
    fetchData(1);
  }, [categories, vegetarian, sorting]);

  const fetchData = async (page) => {
    const categoryQueryString = categories.map((category) => `categories=${category}`).join('&');
    let url1 = `https://food-delivery.kreosoft.ru/api/dish`;
    let url2 =
      `?page=${page}` +
      (categoryQueryString ? `&${categoryQueryString}` : '') +
      `${vegetarian ? `&vegetarian=${vegetarian}` : ''}` +
      `${sorting ? `&sorting=${sorting}` : ''}`;
    let url = url1 + url2;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDishes(data.dishes);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    console.log({ url });
  };

  const handleRateDish = async (dishId, rating) => {
    try {
      const response = await fetch(
        `https://food-delivery.kreosoft.ru/api/dish/${dishId}/rating?ratingScore=${rating}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setDishes((prevDishes) =>
          prevDishes.map((dish) => (dish.id === dishId ? { ...dish, rated: true } : dish)),
        );
      } else if (response.status === 400) {
        setDishes((prevDishes) =>
          prevDishes.map((dish) => (dish.id === dishId ? { ...dish, rated: false } : dish)),
        );

        console.error('Error submitting rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handlePageChange = ({ selected }) => {
    console.log(selected + 1);
    fetchData(selected + 1);
  };

  const handleCategoryChange = (selectedCategories) => {
    const selectedCategoryValues = selectedCategories.map((category) => category.value);
    setCategories(selectedCategoryValues);
  };

  const handleSortingChange = (selectedSorting) => {
    setSorting(selectedSorting.value);
  };

  return (
    <div>
      <Header />
      <div className="MainPhoto"></div>
      <div className="categories-container">
        <div className="categories-group">
          <label>Категории:</label>
          <Select
            isMulti
            className="categories"
            options={[
              { value: 'Wok', label: 'Wok' },
              { value: 'Pizza', label: 'Pizza' },
              { value: 'Soup', label: 'Soup' },
              { value: 'Dessert', label: 'Dessert' },
              { value: 'Drink', label: 'Drink' },
            ]}
            onChange={handleCategoryChange}
          />
        </div>

        <div className="categories-group">
          <label>Вегетарианское:</label>
          <input
            className="categories"
            type="checkbox"
            checked={vegetarian}
            onChange={() => setVegetarian(!vegetarian)}
          />
        </div>

        <div className="categories-group">
          <label>Сортировка:</label>
          <Select
            className="categories"
            options={[
              { value: 'NameAsc', label: 'По имени (по возрастанию)' },
              { value: 'NameDesc', label: 'По имени (по убыванию)' },
              { value: 'PriceAsc', label: 'По цене (по возрастанию)' },
              { value: 'PriceDesc', label: 'По цене (по убыванию)' },
              { value: 'RatingAsc', label: 'По рейтингу (по возрастанию)' },
              { value: 'RatingDesc', label: 'По рейтингу (по убыванию)' },
            ]}
            onChange={handleSortingChange}
          />
        </div>
      </div>

      <ul className="dish-list">
        {dishes.map((dish) => (
          <li key={dish.id} className="dish-item">
            <Link to={`/item/${dish.id}`}>
              <p>Name: {dish.name}</p>

              <div className="image-container">
                {dish.vegetarian && (
                  <img src={listImage} alt="Vegetarian" className="vegetarian-icon" />
                )}
                <img src={dish.image} alt="My Image" />
              </div>
              <p>Price: {dish.price}</p>
            </Link>
            <p>
              <>
                Оценка{' '}
                <StarRating
                  rating={dish.rating}
                  onRate={(newRating) => handleRateDish(dish.id, newRating)}
                />
              </>
            </p>
            <p>
              {dish.rated === true
                ? 'Оценка отправлена. Спасибо за отзыв!'
                : dish.rated === false
                ? 'Вы это блюдо еще не пробовали.'
                : 'Вы еще не оценили это блюдо. Кликните на звезду, чтобы оценить.'}
            </p>
            <div className="fixed-buy-button">
              <button onClick={() => addToCart(dish.id, token)}>В корзину</button>
            </div>
          </li>
        ))}
      </ul>

      <ReactPaginate
        pageCount={pagination.count}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default HomeWithLog;
