import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    gap: SPACING[5],
    paddingBottom: SPACING[8],
    paddingHorizontal: SPACING[6],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING[1],
  },
  menuButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  headerTitle: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  headerSpacer: {
    width: 40,
  },
  body: {
    gap: SPACING[5],
  },
  stateText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    textAlign: 'center',
  },
  errorBox: {
    alignItems: 'center',
    gap: SPACING[4],
    paddingTop: SPACING[8],
  },
  retryButton: {
    minWidth: 190,
  },
  formError: {
    color: COLORS.danger,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: 20,
  },
  logoutButton: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING[3],
    height: 54,
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  logoutText: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(6, 26, 64, 0.36)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING[4],
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    gap: SPACING[3],
    padding: SPACING[5],
    ...SHADOWS.lg,
  },
  modalTitle: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extrabold,
    marginBottom: SPACING[1],
  },
  modalActions: {
    flexDirection: 'row',
    gap: SPACING[3],
    marginTop: SPACING[2],
  },
  modalButton: {
    flex: 1,
    height: 48,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    flex: 1,
    height: 48,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
})
