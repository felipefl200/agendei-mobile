import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  content: {
    paddingBottom: SPACING[8],
    paddingHorizontal: SPACING[6],
    paddingTop: SPACING[4],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING[5],
  },
  backButton: {
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
  section: {
    gap: SPACING[3],
    marginTop: SPACING[5],
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  confirmButton: {
    backgroundColor: COLORS.accent,
    marginBottom: SPACING[5],
    marginTop: SPACING[8],
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  emptyState: {
    gap: SPACING[4],
    marginTop: SPACING[8],
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  formError: {
    color: COLORS.danger,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: 20,
    marginTop: SPACING[4],
  },
  stateText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
})
