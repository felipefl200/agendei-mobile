import { COLORS, COMPONENTS, FONT_SIZE, FONT_WEIGHT, RADIUS } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  btn: {
    ...COMPONENTS.button,
    width: '100%',
    borderRadius: RADIUS.lg,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  danger: {
    backgroundColor: COLORS.danger,
  },

  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center',
  },
})
