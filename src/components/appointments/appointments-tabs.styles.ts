import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    gap: SPACING[2],
    paddingTop: SPACING[2],
  },
  label: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  activeLabel: {
    color: COLORS.primary,
  },
  indicator: {
    backgroundColor: COLORS.borderSoft,
    height: 2,
    width: '100%',
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    height: 3,
  },
})
