import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.md,
    height: 78,
    justifyContent: 'center',
    width: 62,
  },
  pastContainer: {
    backgroundColor: COLORS.surfaceSoft,
  },
  day: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.extrabold,
    lineHeight: 28,
  },
  month: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  pastText: {
    color: COLORS.textMuted,
  },
})
