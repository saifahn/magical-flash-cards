import React from 'react';
import styled from 'styled-components';
// import './Cards.css';

const Card = styled.li`
  font-family: 'Dank Mono', monospaced;
  padding: 0.25rem 0.75rem;
  display: ${props => (props.isGrid ? 'none' : 'block')};
  background-color: #e5d7d2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 0.5rem;
  border-left: solid 4px #5a114d;
  color: #333;

  & h4 {
    font-family: 'Dank Mono', monospaced;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const CardImage = styled.img`
  display: ${props => (props.isGrid ? 'block' : 'none')};
  max-width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
`;

const ManaCost = styled.h4`
  margin-left: auto;
`;

const CardList = styled.ul`
  padding: 0;
  margin: 10px;
  list-style: none;
  
  @media (min-width: 414px) {
    margin: 15px;
    max-width: 560px;
  }
`;


const Cards = (props) => {
  let cardClass = 'c-cards';
  const { isGrid, cards } = props;
  if (isGrid) {
    cardClass += ' is-grid';
  }
  return (
    <section className={cardClass}>
      <div className="c-cards-container">
        <CardList className="c-card-items">
          {
            cards.map(card => (
              <div>
                <CardImage
                  src={card.image_uris.border_crop}
                  // className="c-card-items__image"
                  alt={card.name}
                  isGrid={isGrid}
                />
                <Card key={card.id} className="c-card-items__card" isGrid={isGrid}>
                  <CardHeader>
                    <h4 className="c-card-items__name">{card.name}</h4>
                    <ManaCost className="c-card-items__mana-cost">{card.mana_cost}</ManaCost>
                  </CardHeader>
                  <p>Instant</p>
                  <p className="c-card-items__text">{card.oracle_text}</p>
                </Card>
              </div>
            ))
          }
        </CardList>
      </div>
    </section>
  );
};

export default Cards;
