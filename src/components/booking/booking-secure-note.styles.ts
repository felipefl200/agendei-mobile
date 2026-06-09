import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[2],
    justifyContent: 'center',
  },
  text: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
})
