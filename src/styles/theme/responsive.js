import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isTablet = width >= 768;
export const isLargeScreen = width >= 1024;
export const isMobile = width < 768;

export const responsive = {
  width,
  height,
  isTablet,
  isLargeScreen,
  isMobile,
  cardWidth: isLargeScreen ? '32%' : isTablet ? '48%' : '100%',
  contentMaxWidth: isLargeScreen ? 1200 : isTablet ? 900 : '100%',
  horizontalPadding: isLargeScreen ? 24 : 16,
};

export const getCardWidth = (columns = 2) => {
  if (isLargeScreen) {
    return `${100 / columns}%`;
  }
  if (isTablet) {
    return '48%';
  }
  return '100%';
};

export default responsive;
