import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media, text } from '../../../utils/theme';
import { italicizeReminderText } from '../../../utils/text-alter';

const BaseCard = styled.div`
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
    font-size: ${text.md};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    
    ${media.sm`
      font-size: ${text.lg};
    `}
  }
`;

const CardHeader = styled.div`
  display: flex;
`;

const ManaCost = styled.h4`
  margin-left: auto;
`;

export const Card = (props) => {
  const { card, isGrid } = props;
  return (
    <BaseCard isGrid={isGrid}>
      <CardHeader>
        <h4 className="c-card-items__name">{card.name}</h4>
        <ManaCost className="c-card-items__mana-cost">{card.mana_cost}</ManaCost>
      </CardHeader>
      <p>Instant</p>
      <p className="c-card-items__text" dangerouslySetInnerHTML={italicizeReminderText(card.oracle_text)} />
    </BaseCard>
  );
};

export const SplitCard = (props) => {
  const { card, isGrid } = props;
  return (
    <BaseCard isGrid={isGrid}>
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
        );
      })
      }
    </BaseCard>
  );
};
