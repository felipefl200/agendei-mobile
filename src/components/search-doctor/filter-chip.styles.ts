import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
    height: 34,
    justifyContent: 'center',
    paddingHorizontal: SPACING[4],
  },
  activeContainer: {
    backgroundColor: COLORS.primary,
  },
  label: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  activeLabel: {
    color: COLORS.white,
  },
})
