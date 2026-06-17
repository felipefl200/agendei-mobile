import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderBottomColor: COLORS.borderSoft,
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 50,
    paddingHorizontal: SPACING[5],
  },
  label: {
    color: COLORS.textPrimary,
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.semibold,
    marginLeft: SPACING[3],
  },
  trailing: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[2],
    justifyContent: 'flex-end',
    maxWidth: '48%',
  },
  value: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    textAlign: 'right',
  },
})
