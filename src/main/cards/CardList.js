import React from 'react';
import styled from 'styled-components';
import { media } from '../../utils/theme';
import { Card, SplitCard } from './Card/Card';

const CardImage = styled.img`
  display: ${props => (props.isGrid ? 'inline' : 'none')};
  max-width: 100%;
`;

const CardWrapper = (props) => {
  const { card, isGrid, hasMultipleFaces } = props;
  return (
    <div>
      <CardImage
        src={card.image_uris.border_crop}
        alt={card.name}
        isGrid={isGrid}
      />
      {
        hasMultipleFaces
          ? (<SplitCard card={card} isGrid={isGrid} />)
          : (<Card card={card} isGrid={isGrid} />)
      }
    </div>
  );
};

const StyledCardWrapper = styled(CardWrapper)`
  display: inline-block;
  margin: auto;
`;

const CardContainer = styled.div`
  width: 100%;
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

const CardList = (props) => {
  const { isGrid, cards } = props;
  return (
    <CardContainer className="c-card-items">
      {
        cards.map((card) => {
          const hasMultipleFaces = !!card.card_faces;
          return (
            <StyledCardWrapper
              card={card}
              isGrid={isGrid}
              hasMultipleFaces={hasMultipleFaces}
            />
          );
        })
      }
    </CardContainer>
  );
};

export default CardList;
