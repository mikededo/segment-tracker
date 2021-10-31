import { createTheme } from '@mui/material';

const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5688C7', contrastText: '#fafafa' },
    secondary: { main: '#F6BD60' },
    warning: { main: '#ffc107' },
    error: { main: '#e32636' },
    info: { main: '#2196f3' },
    success: { main: '#4caf50' },
    divider: 'rgba(66,66,66,0.15)',
    text: { primary: '#2f2f2f', secondary: 'rgba(59,59,59,0.8)' },
  },
  typography: {
    fontFamily: 'Inter',
    h1: { fontSize: 24, fontWeight: 700, lineHeight: 1 },
    h2: { fontSize: 24, fontWeight: 500, lineHeight: 1 },
    h3: { fontSize: 20, fontWeight: 700, lineHeight: 1 },
    h4: { fontSize: 20, fontWeight: 500, lineHeight: 1 },
    h5: { fontSize: 18, fontWeight: 700, lineHeight: 1 },
    h6: { fontSize: 18, fontWeight: 400, lineHeight: 1 },
    subtitle1: { fontWeight: 400, lineHeight: 1 },
    subtitle2: { fontWeight: 400, lineHeight: 1 },
    body1: { fontWeight: 400, lineHeight: 1 },
    body2: { fontSize: 14, lineHeight: 1 },
    button: { fontSize: 14, lineHeight: 1, letterSpacing: 0.25 },
    overline: { lineHeight: 1 },
    caption: { lineHeight: 1 },
    fontWeightBold: 700,
  },
  shape: { borderRadius: 4 },
  components: {
    MuiTooltip: { defaultProps: { arrow: true } },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: 0 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', padding: '10px 16px' },
        outlined: { borderRadius: 4 },
      },
      defaultProps: { variant: 'contained', disableElevation: true },
    },
    MuiPaper: {
      defaultProps: { variant: 'outlined' },
    },
    MuiCard: {
      styleOverrides: {
        root: { padding: '16px 24px' },
      },
    },
    MuiDialogActions: {
      styleOverrides: { root: { padding: '0px 24px 16px' } },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
        },
      },
    },
    MuiSnackbar: { defaultProps: { autoHideDuration: 5000 } },
  },
});

export default AppTheme;
