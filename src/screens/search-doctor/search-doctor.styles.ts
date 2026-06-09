import { COLORS, FONT_SIZE, FONT_WEIGHT, RADIUS, SPACING } from '@/constants/theme'
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
    paddingHorizontal: SPACING[5],
    paddingTop: SPACING[4],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING[3],
    marginBottom: SPACING[4],
  },
  iconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInputField: {
    borderColor: COLORS.borderSoft,
    borderRadius: RADIUS.lg,
    minHeight: 46,
    paddingHorizontal: SPACING[3],
  },
  searchInput: {
    fontSize: FONT_SIZE.xs,
    minHeight: 44,
  },
  filtersContent: {
    gap: SPACING[3],
    paddingBottom: SPACING[5],
  },
  sectionHeader: {
    marginBottom: SPACING[3],
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.extrabold,
  },
  doctorList: {
    gap: SPACING[4],
  },
})
