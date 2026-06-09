import { FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING[3],
    paddingVertical: SPACING[1],
  },
  label: {
    fontSize: FONT_SIZE.xxs,
    fontWeight: FONT_WEIGHT.bold,
  },
})
