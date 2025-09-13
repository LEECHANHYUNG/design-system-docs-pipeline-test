import { style } from '@vanilla-extract/css';

export const buttonStyle = style({
  backgroundColor: '#1e90ff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.2s',

  ':hover': {
    backgroundColor: '#0073e6',
  },
});
