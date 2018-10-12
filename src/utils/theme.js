import { css } from 'styled-components';

const sizes = {
  sm: 414,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const theme = {
  colours: {
    primary: '$5a114d',
  },
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return accumulator;
}, {});

export const text = {
  base: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '1.875rem',
  '2xl': '2.25rem',
};
