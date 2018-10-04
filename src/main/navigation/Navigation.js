import React from 'react';
// import './Navigation.css';
import styled from 'styled-components';
import ManaInput from './ManaInput';
import SortToggle from './SortToggle';
import SetSelector from './SetSelector';
// import Colors from './Colors';

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
    <button
      onClick={toggleGrid}
      className="c-button"
    >
      Grid Toggle
    </button>
  </div>
);

export default styled(Navigation)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;
