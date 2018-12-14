export const a = 2;

const formatManaCostToColorObject = (cost) => {
  const re = /[\d{}]/g;
  const formattedCost = cost.replace(re, '');
  const manaObject = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
  };
  for (let i = 0, n = formattedCost.length; i < n; i += 1) {
    // add one of the appropriate color
    manaObject[formattedCost[i]] += 1;
  }
  return manaObject;
};

export const filterCardByMana = (card, mana) => {
  /**
   * @param card: the card to be filtered
   * @param mana: state.filters.mana
   */
  // if the mana has a generic number
  const genericNum = mana.match(/\d/);
  let filterCMC;
  if (genericNum) {
    filterCMC = (genericNum.length - 1) + parseInt(genericNum, 10);
  } else {
    filterCMC = mana.length;
  }
  if (filterCMC < card.cmc) {
    return false;
  }
  const cardCost = formatManaCostToColorObject(card.mana_cost);
  const manaCost = formatManaCostToColorObject(mana);
  const colors = Object.keys(cardCost);
  for (let i = 0, n = colors.length; i < n; i += 1) {
    if (cardCost[colors[i]] > manaCost[colors[i]]) {
      return false;
    }
  }
  return true;
};
