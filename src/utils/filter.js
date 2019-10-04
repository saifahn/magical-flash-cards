export const isDesired = (oracleText, typeLine) => {
  if (typeLine.includes('Instant')) {
    return true;
  }
  // scan through oracle_text and look for exactly 'Flash'
  const flashRegex = /\bFlash\b/;
  const found = oracleText.match(flashRegex);
  if (found) {
    return true;
  }
  return false;
};

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

const calculateManaAmount = (cost) => {
  const formattedCost = cost.replace(/[{}]/g, '');
  const matchRE = /(\d+)?(\w+)?/;
  const matched = formattedCost.match(matchRE);
  const genericMana = matched[1];
  const colouredMana = matched[2];
  if (!genericMana) {
    return matched[0].length;
  }
  let sum = Number(genericMana);
  sum += colouredMana ? colouredMana.length : 0;
  return sum;
};

/**
 * Takes a card face and returns true if it can be cast at instant speed with the
 * given mana.
 *
 * @param {Object} face: the card face to be evaluated
 * @param {string} mana: the mana cost to be evaluated against
 */
export const isFaceCastable = (face, mana) => {
  if (!face.type_line.includes('Instant')) {
    return false;
  }
  const filterCMC = mana.length;
  if (filterCMC < calculateManaAmount(face.mana_cost)) {
    return false;
  }
  const cardCost = formatManaCostToColorObject(face.mana_cost);
  const manaCost = formatManaCostToColorObject(mana);
  const colors = Object.keys(cardCost);
  for (let i = 0, n = colors.length; i < n; i += 1) {
    if (cardCost[colors[i]] > manaCost[colors[i]]) {
      return false;
    }
  }
  return true;
};

/**
 * Takes a card and returns true if it can be cast with the given mana.
 *
 * @param {Object} card: the card to be evaluated
 * @param {string} mana: the mana cost to be evaluated against
 */
export const canBeCast = (card, mana) => {
  if (card.card_faces) {
    const firstFace = card.card_faces[0];
    const secondFace = card.card_faces[1];
    return isFaceCastable(firstFace, mana) || isFaceCastable(secondFace, mana);
  }
  const filterCMC = mana.length;
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
