import React, { Component } from 'react';
import Header from '../header.tsx';
import Items from '../items.tsx';
const items = [
  {
    id: 1,
    title: 'Норвежский Суп',
    img: 'Norvezhskiy-sup.webp',
    desc: 'Насыщенный  сливочным вкусом овощной суп с рыбой',
    category: 'Суп',
    price: '299.99',
  },
  {
    id: 2,
    title: 'Том ям',
    img: 'Tayskiy-sup-Tom_YAm.webp',
    desc: 'Острый тайский суп с овощами (бульон, паста карри Том Ям, основа для супа Том',
    category: 'Суп',
    price: '299.99',
  },
  {
    id: 3,
    title: 'Суп куриный с морковью',
    img: 'Sup-Letniy.webp',
    desc: 'Бульон, филе куриное, морковь, лук зеленый',
    category: 'Суп',
    price: '199.99',
  },
  {
    id: 4,
    title: 'Сырный суп',
    img: 'Syrnyy-sup.webp',
    desc: 'Суп-пюре на основе сыра - сама нежность. Куриное филе - отличное дополнение к сливочному вкусу',
    category: 'Суп',
    price: '199.99',
  },
  {
    id: 5,
    title: 'Стейк из форели',
    img: 'Steyk-iz-foreli.jpg',
    desc: 'Стейк из форели, лимон. специи. Подается с гарниром на выбор , овощным  салатом и соус Тар-тар.',
    category: 'Стейк',
    price: '899.99',
  },
  {
    id: 6,
    title: 'Грязный стейк Президента',
    img: 'Gryaznyy_steyk_prezidenta.jpg',
    desc: 'Сочный стейк из мраморной говядины Black Angus приготовленный уникальным способом на углях, с гарниром на выбор, овощным салатом и соусом Горчичный',
    category: 'Стейк',
    price: '999.99',
  },
  {
    id: 7,
    title: 'Стейк из форели',
    img: 'Steyk-iz-kapusty.webp',
    desc: 'Жаренный на гриле стейк в сливочном соусе с кунжутом и базиликом.',
    category: 'Стейк',
    price: '299.99',
  },
  {
    id: 8,
    title: 'Стейк из говядины(мрамор)',
    img: 'Steyk_iz_govyadiny.jpg',
    desc: 'Сочный стейк из мраморной говядины Black Angus (200 дней зернового откорма, 21 день влажного вызревания), мы приготовили на гриле.Предлагаем его с гарниром на выбор, овощным салатом и соусом Горчичный',
    category: 'Стейк',
    price: '899.99',
  },
  {
    id: 9,
    title: 'Стейк из говяд Пеппер',
    img: 'Steyk_iz_govyadiny_premialnyy_Pepper_.jpg',
    desc: 'Пикантный вкус щедро приправленного смесью перцев стейка, превосходно сочетается с любым из гарниров на выбор и соусом Горчичный',
    category: 'Стейк',
    price: '899.99',
  },
  {
    id: 10,
    title: 'Салат Стройный',
    img: 'Salat-Bum.webp',
    desc: 'Свекла печеная (свекла, масло растительное, соль), тыква печеная (тыква, масло растительное, соль),',
    category: 'Салат',
    price: '199.99',
  },
  {
    id: 11,
    title: 'Салат Цезарь с копченым сыром',
    img: 'Salat-TSezar-s-kopchenym-syrom.jpg',
    desc: 'Салат айсберг, сыр копченый, соус цезарь (майонез, уксус бальзамический, соус соевый, чеснок, масло растительное, соль, сахар,каперсы, анчоусы),',
    category: 'Салат',
    price: '299.99',
  },
  {
    id: 12,
    title: 'Салат Цезарь с цыпленком',
    img: 'Salat-TSezar-s-tsyplenkom.jpg',
    desc: 'Микс салата, соус Цезарь, сыр, яйцо перепелиное, томаты свежие, сухарики пшеничные, филе куриное',
    category: 'Салат',
    price: '299.99',
  },
];
class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="MainPhoto"></div>
        <Items items={items} onAdd={() => {}} />
      </div>
    );
  }
}

export default Home;
