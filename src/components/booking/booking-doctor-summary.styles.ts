import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
  SHADOWS,
  SPACING,
} from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING[4],
    padding: SPACING[4],
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
    gap: SPACING[1],
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  specialty: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[1],
    marginTop: SPACING[1],
  },
  rating: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  muted: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  clinic: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.semibold,
  },
})
