import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { media, text } from '../../utils/theme';
// import './Cards.css';

const Card = styled.div`
  font-family: 'Inconsolata', monospace;
  font-size: ${text.base};
  padding: 0.25rem 0.75rem;
  display: ${props => (props.isGrid ? 'none' : 'inline-block')};
  background-color: #e5d7d2;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-bottom: 0.5rem;
  border-left: 4px solid ${props => props.theme.primary || '#5a114d'};
  color: #333;

  ${media.sm`
    border-left: 5px solid #5a114d;
    font-size: ${text.md};
  `}
  ${media.lg`
    max-width: 464px;
  `}

  h4 {
    font-size: ${text.md}
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    
    ${media.sm`
      font-size: ${text.lg};
    `}
  }
`;

const CardImage = styled.img`
  display: ${props => (props.isGrid ? 'inline' : 'none')};
  max-width: 100%;
  margin: 0 10px;

  /* ${media.md`
    width: calc(100% / 2 - 15px);
  `}

  ${media.xl`
    width: calc(100% / 3 - 30px);
  `} */
`;

const CardHeader = styled.div`
  display: flex;
`;

const ManaCost = styled.h4`
  margin-left: auto;
`;

const CardList = styled.div`
  width: 100%;
  column-count: 1;
  /* display: flex;
  justify-content: space-between;
  flex-wrap: wrap; */
  padding: 0;
  margin: 10px;

  margin: 0 10px;

  ${media.sm`
    margin: 0;
  `}

  ${media.md`
    column-count: 2;
  `}

  ${media.lg`
    column-count: 3;
  `}
`;

// const CardWrapper = styled.div``;
const CardWrapper = styled.div`
  display: inline-block;
  margin: auto;
`;

const Cards = (props) => {
  const { isGrid, cards } = props;
  return (
    <CardList className="c-card-items">
      {
        cards.map(card => (
          <CardWrapper key={card.id}>
            <CardImage
              src={card.image_uris.border_crop}
              // className="c-card-items__image"
              alt={card.name}
              isGrid={isGrid}
            />
            <Card className="c-card-items__card" isGrid={isGrid}>
              <CardHeader>
                <h4 className="c-card-items__name">{card.name}</h4>
                <ManaCost className="c-card-items__mana-cost">{card.mana_cost}</ManaCost>
              </CardHeader>
              <p>Instant</p>
              <p className="c-card-items__text">{card.oracle_text}</p>
            </Card>
          </CardWrapper>
        ))
      }
    </CardList>
  );
};

export default Cards;
