import { COLORS, FONT_SIZE, FONT_WEIGHT, SHADOWS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderTopColor: COLORS.borderSoft,
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 74,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING[4],
    paddingTop: SPACING[2],
    ...SHADOWS.sm,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    gap: SPACING[1],
    justifyContent: 'center',
  },
  label: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xxs,
    fontWeight: FONT_WEIGHT.medium,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.bold,
  },
})
