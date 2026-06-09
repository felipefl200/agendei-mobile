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
    paddingBottom: SPACING[6],
    paddingHorizontal: SPACING[6],
    paddingTop: SPACING[4],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING[6],
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
  section: {
    marginTop: SPACING[6],
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
    marginBottom: SPACING[3],
  },
  list: {
    gap: SPACING[4],
  },
})
