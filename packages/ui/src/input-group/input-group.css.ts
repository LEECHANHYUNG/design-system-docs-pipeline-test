import { style } from '@vanilla-extract/css';

export const inputGroupStyle = style({
  display: 'flex',
  alignItems: 'stretch',
  border: '1px solid #ccc',
  borderRadius: '4px',
  overflow: 'hidden',
  transition: 'border-color 0.2s',

  ':focus-within': {
    borderColor: '#1e90ff',
    boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.2)',
  },

  ':hover': {
    borderColor: '#999',
  },
});

export const inputGroupItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  borderRight: '1px solid #ccc',

  selectors: {
    '&:first-child input': {
      border: 'none',
      borderRadius: '0',
      borderTopLeftRadius: '3px',
      borderBottomLeftRadius: '3px',
    },

    '&:last-child': {
      borderRight: 'none',
    },

    '&:last-child input': {
      border: 'none',
      borderRadius: '0',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
    },

    '&:not(:first-child):not(:last-child) input': {
      border: 'none',
      borderRadius: '0',
    },
  },
});