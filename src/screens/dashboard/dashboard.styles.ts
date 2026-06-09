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
    paddingHorizontal: SPACING[6],
    paddingTop: SPACING[4],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING[5],
  },
  iconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  notificationButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  notificationDot: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.background,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: 8,
    top: 7,
    width: 10,
  },
  greeting: {
    gap: SPACING[1],
    marginBottom: SPACING[4],
  },
  greetingTitle: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.extrabold,
    lineHeight: 29,
  },
  greetingSubtitle: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: 20,
  },
  section: {
    marginTop: SPACING[6],
  },
  specialtiesGrid: {
    flexDirection: 'row',
    gap: SPACING[3],
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING[3],
  },
  quickActionTile: {
    flexBasis: '48%',
    flexGrow: 1,
    flexShrink: 0,
  },
})
