import React from 'react';
// import './Navigation.css';
import styled from 'styled-components';
import ManaInput from './ManaInput';
import SortToggle, { ToggleButton } from './SortToggle';
import SetSelector from './SetSelector';
// import Colors from './Colors';

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.2rem;
`;

const ToggleHeader = styled.p`
  margin-right: auto;
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
  </div>
);

export default styled(Navigation)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;
