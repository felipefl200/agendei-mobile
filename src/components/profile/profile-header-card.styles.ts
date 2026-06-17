import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING[5],
    padding: SPACING[5],
    ...SHADOWS.md,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  avatarText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  content: {
    flex: 1,
    gap: SPACING[2],
  },
  name: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  email: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
  },
  editButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: COLORS.secondaryDark,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING[2],
    height: 38,
    marginTop: SPACING[2],
    paddingHorizontal: SPACING[4],
  },
  editButtonText: {
    color: COLORS.secondaryDark,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
})
