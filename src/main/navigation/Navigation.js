import React from 'react';
import styled from 'styled-components';
import { media, text } from '../../utils/theme';
import ManaInput from './ManaInput';
import SortToggle, { ToggleButton } from './SortToggle';
import SetSelector from './SetSelector';

const SortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${media.md`
    max-width: 560px;
  `}

  ${media.md`
    margin: auto;
  `}
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: ${text.md};
  margin: 0 10px;

  ${media.sm`
    font-size: ${text.lg};
    margin: 0;
    padding: 0 0.5rem;
  `}
`;

const ToggleHeader = styled.p`
  min-width: 80px;
  margin-right: 0.5rem;
  font-style: italic;
`;

const Navigation = ({
  className,
  setManaFilter,
  toggleSort,
  toggleGrid,
  handleSetChange,
  sets,
  sortBy,
  isGrid
}) => (
  <div className={className}>
    <ManaInput setManaFilter={setManaFilter} />
    <SetSelector
      handleSetChange={handleSetChange}
      sets={sets}
    />
    <SortWrapper>
      <SortContainer>
        <ToggleHeader>
          sort by:
        </ToggleHeader>
        <SortToggle
          toggleSort={toggleSort}
          sorter="cmc"
          sortBy={sortBy}
        >
          mana cost
        </SortToggle>
        <SortToggle
          toggleSort={toggleSort}
          sorter="colour"
          sortBy={sortBy}
        >
          colour
        </SortToggle>
      </SortContainer>

      <SortContainer>
        <ToggleHeader>
          mode:
        </ToggleHeader>
        <ToggleButton
          onClick={toggleGrid}
          className="c-button"
          disabled={!isGrid}
          isSelected={!isGrid}
        >
          text
        </ToggleButton>
        <ToggleButton
          onClick={toggleGrid}
          className="c-button"
          disabled={isGrid}
          isSelected={isGrid}
        >
          cards
        </ToggleButton>
      </SortContainer>
    </SortWrapper>
  </div>
);

export default styled(Navigation)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  /* max-width: 400px; */
`;
