import React from 'react';
// import './Navigation.css';
import styled from 'styled-components';
import ManaInput from './ManaInput';
import SortToggle, { SortButton } from './SortToggle';
import SetSelector from './SetSelector';
// import Colors from './Colors';

const Button = styled.button`
  border: none;
  background: none;
  font-family: 'Domine';
  font-size: 1rem;
`;

const Navigation = ({ className, setManaFilter, toggleSort, toggleGrid, handleSetChange, sets}) => (
  <div className={className}>
    <ManaInput setManaFilter={setManaFilter} />
    <SetSelector
      handleSetChange={handleSetChange}
      sets={sets}
    />
    <SortToggle
      toggleSort={toggleSort}
      sorter="cmc"
    />
    <SortToggle
      toggleSort={toggleSort}
      sorter="colour"
    />
    <SortButton
      onClick={toggleGrid}
      className="c-button"
    >
      grid toggle
    </SortButton>
  </div>
);

export default styled(Navigation)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;
