import { style } from '@vanilla-extract/css';

export const inputStyle = style({
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  transition: 'border-color 0.2s',

  ':focus': {
    outline: 'none',
    borderColor: '#1e90ff',
    boxShadow: '0 0 0 2px rgba(30, 144, 255, 0.2)',
  },

  ':hover': {
    borderColor: '#999',
  },
});

export const inputLabelStyle = style({
  display: 'block',
  marginBottom: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
});