import { COLORS, RADIUS, SHADOWS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingBottom: SPACING[3],
    paddingHorizontal: SPACING[2],
    paddingTop: SPACING[2],
    ...SHADOWS.sm,
  },
})
