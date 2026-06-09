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
    minHeight: 116,
    padding: SPACING[3],
    ...SHADOWS.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
    lineHeight: 20,
  },
  specialty: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: 19,
    marginTop: SPACING[1],
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[1],
    marginTop: SPACING[2],
  },
  rating: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  reviews: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  availability: {
    color: COLORS.success,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 19,
    marginTop: SPACING[2],
  },
  favoriteButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
})
