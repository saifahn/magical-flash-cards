import React, { Fragment } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { media, text } from '../../utils/theme';
import { italicizeReminderText } from '../../utils/text-alter';
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
  width: 100%;

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
  /* column-count: 1; */
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;

  ${media.sm`
    padding-left: 0;
    padding-right: 0;
  `}

  ${media.md`
    display: block;
    column-count: 2;
  `}

  ${media.lg`
    column-count: 3;
  `}
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const PowerToughness = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

// const CardWrapper = styled.div``;
const CardWrapper = styled.div`
  display: inline-block;
  margin: auto;
  width: 100%;
`;

const Cards = (props) => {
  const { isGrid, cards } = props;
  return (
    <CardList className="c-card-items">
      {
        cards.map((card) => {
          const hasMultipleFaces = !!card.card_faces;
          if (hasMultipleFaces) {
            return (
              <CardWrapper key={card.id}>
                <CardImage
                  src={card.image_uris.border_crop}
                  alt={card.name}
                  isGrid={isGrid}
                />
                <Card className="c-card-items__card" isGrid={isGrid}>
                  {card.card_faces.map((face) => {
                    const oracleText = italicizeReminderText(face.oracle_text);
                    return (
                      <Fragment>
                        <CardHeader>
                          <h4 className="c-card-items__name">{face.name}</h4>
                          <ManaCost className="c-card-items__mana-cost">{face.mana_cost}</ManaCost>
                        </CardHeader>
                        <p>{face.type_line}</p>
                        <p className="c-card-items__text" dangerouslySetInnerHTML={oracleText} />
                      </Fragment>
                    )
                  })}
                </Card>
              </CardWrapper>
            );
          }
          const oracleText = italicizeReminderText(card.oracle_text);
          return (
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
                <p className="c-card-items__text" dangerouslySetInnerHTML={oracleText} />
                {card.power && card.toughness && (
                  <CardFooter>
                    <PowerToughness>
                      {card.power}
                      /
                      {card.toughness}
                    </PowerToughness>
                  </CardFooter>
                )}
              </Card>
            </CardWrapper>
          );
        })
      }
    </CardList>
  );
};

export default Cards;
