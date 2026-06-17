import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: SPACING[3],
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
})
