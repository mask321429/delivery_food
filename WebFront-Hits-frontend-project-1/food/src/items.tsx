import React from 'react';
import Item from './item.tsx';

type ItemsProps = {
  items: {
    id: number,
    title: string,
    img: string,
    desc: string,
    category: string,
    price: string,
  }[],
  onAdd(): void
}

const Items: React.FC<ItemsProps> = (props) => {
  return (
    <main>
      {props.items.map((el, index) => (
        <Item key={index} item={el} onAdd={props.onAdd} />
      ))}
    </main>
  );
};

export default Items;
