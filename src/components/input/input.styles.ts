import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    gap: SPACING[2],
    width: '100%',
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
  },
  field: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING[3],
    minHeight: 54,
    paddingHorizontal: SPACING[4],
  },
  fieldFocused: {
    borderColor: COLORS.primary,
  },
  fieldError: {
    backgroundColor: COLORS.dangerLight,
    borderColor: COLORS.danger,
  },
  fieldDisabled: {
    backgroundColor: COLORS.surfaceSoft,
    opacity: 0.72,
  },
  input: {
    color: COLORS.textPrimary,
    flex: 1,
    fontSize: FONT_SIZE.sm,
    minHeight: 52,
    padding: 0,
  },
  helperText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.xs,
    lineHeight: 16,
  },
  errorText: {
    color: COLORS.danger,
    fontWeight: FONT_WEIGHT.medium,
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 22,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
  },
})
