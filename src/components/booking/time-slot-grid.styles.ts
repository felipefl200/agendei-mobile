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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING[2],
  },
  slot: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    flexBasis: '23%',
    flexGrow: 1,
    height: 36,
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  selectedSlot: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  slotText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  selectedSlotText: {
    color: COLORS.white,
  },
})
