import { COLORS, RADIUS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    height: 86,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: 74,
  },
  hair: {
    backgroundColor: COLORS.primaryDark,
    position: 'absolute',
  },
  hairLong: {
    borderRadius: RADIUS.full,
    height: 58,
    top: SPACING[2],
    width: 54,
  },
  hairShort: {
    borderTopLeftRadius: RADIUS.full,
    borderTopRightRadius: RADIUS.full,
    height: 30,
    top: SPACING[3],
    width: 48,
  },
  hairWide: {
    borderRadius: RADIUS.xl,
    height: 56,
    top: SPACING[2],
    width: 60,
  },
  hairSoft: {
    borderRadius: RADIUS.lg,
    height: 50,
    top: SPACING[3],
    width: 50,
  },
  face: {
    backgroundColor: '#FFC09B',
    borderRadius: RADIUS.full,
    height: 38,
    marginBottom: -8,
    width: 38,
  },
  coat: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
    height: 38,
    justifyContent: 'center',
    width: 64,
  },
})
