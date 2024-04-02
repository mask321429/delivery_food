import React from 'react';

type ItemProps = {
  item: {
    id: number;
    title: string;
    img: string;
    desc: string;
    category: string;
    price: string;
  };
  onAdd(item: any): void;
};

const Item: React.FC<ItemProps> = (props) => {
  return (
    <div className="food">
      <img src={'../img/' + props.item.img} alt={props.item.title} />
      <h2>{props.item.title}</h2>
      <b>{props.item.price}</b>
      <div className="add-to-card" onClick={() => props.onAdd(props.item)}>
        купить
      </div>
    </div>
  );
};

export default Item;


