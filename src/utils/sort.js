export const sortByCMC = (cardsToSort) => {
  const cards = cardsToSort;
  cards.sort((a, b) => (
    a.cmc - b.cmc
  ));
  return cards;
};

export const sortByColour = (cardsToSort) => {
  const assignNumToColour = (card) => {
    /** Function to help in sorting */
    let assignedNum;
    const numColours = card.colors.length;
    // if the card is single coloured, use that colour, otherwise use multicoloured
    const colour = numColours === 1
      ? card.colors[0]
      : 'M';
    switch (colour) {
      case 'W':
        assignedNum = 1;
        break;
      case 'U':
        assignedNum = 2;
        break;
      case 'B':
        assignedNum = 3;
        break;
      case 'R':
        assignedNum = 4;
        break;
      case 'G':
        assignedNum = 5;
        break;
      case 'M':
        assignedNum = 6;
        break;
      default:
        return false;
    }
    return assignedNum;
  };
  const cardsToShow = cardsToSort;
  cardsToShow.sort((a, b) => {
    const aColor = assignNumToColour(a);
    const bColor = assignNumToColour(b);
    return aColor - bColor;
  });
  return cardsToShow;
};
