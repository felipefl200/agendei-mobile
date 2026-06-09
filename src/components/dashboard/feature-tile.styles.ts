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
    flex: 1,
    gap: SPACING[2],
    justifyContent: 'center',
    minHeight: 94,
    padding: SPACING[3],
    ...SHADOWS.sm,
  },
  compactContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[3],
    justifyContent: 'flex-start',
    minHeight: 72,
    paddingHorizontal: SPACING[4],
  },
  iconSurface: {
    alignItems: 'center',
    borderRadius: RADIUS.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  title: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 16,
    textAlign: 'center',
  },
  compactTitle: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    lineHeight: 16,
    textAlign: 'left',
  },
})
