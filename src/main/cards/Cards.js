import React, { Component } from 'react';
import './Cards.css';

const Cards = (props) => {
  let cardClass = 'c-cards';
  const { isGrid, cards } = props;
  if (isGrid) {
    cardClass += ' is-grid';
  }
  return (
    <section className={cardClass}>
      <div className="c-cards-container">
        <ul className="c-card-items">
          {
            cards.map(card => (
              <li key={card.id} className="c-card-items__card">
                <img
                  src={card.image_uris.border_crop}
                  className="c-card-items__image"
                  alt={card.name}
                />
                <h4 className="c-card-items__name">{card.name}</h4>
                <h4 className="c-card-items__mana-cost">{card.mana_cost}</h4>
                <p className="c-card-items__text">{card.oracle_text}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default Cards;
