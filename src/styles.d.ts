import 'styled-components/native';

import { theme } from './themes/theme';

type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends ICustomTheme {}
}
