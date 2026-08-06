import { lightTheme } from './lightTheme';

export const useAppTheme = () => {
  const theme = lightTheme;

  return {
    theme,
    isDark: false,
    colorScheme: 'light',
  };
};
