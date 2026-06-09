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
    minHeight: 108,
    padding: SPACING[3],
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
    gap: SPACING[1],
    justifyContent: 'center',
  },
  doctorName: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  specialty: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[2],
    marginTop: SPACING[1],
  },
  metaText: {
    color: COLORS.textSecondary,
    flexShrink: 1,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  metaDot: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  chevron: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 28,
  },
})
