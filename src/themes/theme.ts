import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    background: '#FCF3E4',
    primary: {
      50: '#e9f9e9',
      100: '#c9e7ca',
      200: '#a9d6aa',
      300: '#87c589',
      400: '#66b567',
      500: '#4c9b4e',
      600: '#3b793c',
      700: '#29562a',
      800: '#173418',
      900: '#021302',
    },
    secondary: {
      50: '#fff4db',
      100: '#ffe0af',
      200: '#fdcc7f',
      300: '#fbb84f',
      400: '#faa31f',
      500: '#e08a05',
      600: '#ae6b01',
      700: '#7e4d00',
      800: '#4c2d00',
      900: '#1e0e00',
    },
    burnt: '#ea6947',
    taupe: '#4b4237',
    alabaster: '#ede7d9',
    darkCyan: '#4b8f8c',
    federalBlue: '#090446',
  },
  components: {
    Input: {
      defaultProps: {
        size: 'lg',
      },
    },
  },
});
