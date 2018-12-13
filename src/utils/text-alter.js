export const italicizeReminderText = (oracle = '') => {
  /**
   * Italicizes reminder text and returns markup to be inserted into card text.
   * @param {string} oracle - the oracle text of a card
   */
  let newText = oracle;
  newText = newText.replace('(', '<em>(');
  newText = newText.replace(')', ')</em>');
  return { __html: newText };
};
