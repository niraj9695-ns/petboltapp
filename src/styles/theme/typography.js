import { Platform } from 'react-native';

export const typography = {
  caption: 10,
  small: 12,
  body: 14,
  subtitle: 16,
  // slightly smaller subtitle for tighter page headings
  // (used for secondary headings / subtitles across screens)
  subtitle: 12,
  cardTitle: 18,
  sectionTitle: 20,
  screenTitle: 24,
  heroTitle: 24,
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const textStyles = {
  caption: { fontSize: typography.caption, fontWeight: typography.weights.medium },
  small: { fontSize: typography.small, fontWeight: typography.weights.regular },
  body: { fontSize: typography.body, fontWeight: typography.weights.regular },
  subtitle: { fontSize: typography.subtitle, fontWeight: typography.weights.medium },
  cardTitle: { fontSize: typography.cardTitle, fontWeight: typography.weights.semibold },
  sectionTitle: { fontSize: typography.sectionTitle, fontWeight: typography.weights.semibold },
  screenTitle: { fontSize: typography.screenTitle, fontWeight: typography.weights.bold },
  heroTitle: { fontSize: typography.heroTitle, fontWeight: typography.weights.bold },
};

export default typography;
