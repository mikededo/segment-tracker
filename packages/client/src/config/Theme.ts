import { createTheme } from '@material-ui/core';

const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#ff6f3c', contrastText: '#fafafa' },
    secondary: { main: '#ffb74d' },
    warning: { main: '#ffc107' },
    error: { main: '#e53935' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' },
    divider: 'rgba(66,66,66,0.05)',
    text: { primary: '#3b3b3b', secondary: 'rgba(59,59,59,0.8)' },
  },
  typography: {
    fontFamily: 'Rubik',
    h1: { fontSize: 24, fontWeight: 700, lineHeight: 1 },
    h2: { fontSize: 24, fontWeight: 500, lineHeight: 1 },
    h3: { fontSize: 20, fontWeight: 700, lineHeight: 1 },
    h4: { fontSize: 20, fontWeight: 500, lineHeight: 1 },
    h5: { fontSize: 18, fontWeight: 700, lineHeight: 1 },
    h6: { fontSize: 18, lineHeight: 1 },
    subtitle1: { fontWeight: 300, lineHeight: 1 },
    subtitle2: { fontWeight: 400, lineHeight: 1 },
    body1: { fontWeight: 500, lineHeight: 1 },
    body2: { fontSize: 14, lineHeight: 1 },
    button: { fontSize: '1rem', lineHeight: 1 },
    overline: { lineHeight: 1 },
    caption: { lineHeight: 1 },
    fontWeightBold: 700,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
  },
});

export default AppTheme;
