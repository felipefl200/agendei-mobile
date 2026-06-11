const COLORS = {
  primary: '#0D6EFD',
  primaryDark: '#082A5E',
  primaryLight: '#EAF4FF',
  secondary: '#20B8C7',
  secondaryDark: '#138DBB',
  secondaryLight: '#E6F8FA',
  accent: '#FF735C',
  accentLight: '#FFF0ED',
  success: '#27AE60',
  successLight: '#EAF8F0',
  warning: '#F5A623',
  warningLight: '#FFF7E8',
  danger: '#DF5951',
  dangerLight: '#FDEDEC',
  white: '#FFFFFF',
  background: '#F8FBFF',
  surface: '#FFFFFF',
  surfaceSoft: '#F2F7FC',
  textPrimary: '#061A40',
  textSecondary: '#52637A',
  textMuted: '#8A98AA',
  textInverse: '#FFFFFF',
  border: '#E2EAF3',
  borderSoft: '#EEF3F8',
  icon: '#5A6B84',
  shadow: '#0A2A5E',

  red: '#DF5951',
  blue: '#0D6EFD',
  gray1: '#323434',
  gray2: '#717f7f',
  gray3: '#a0a0a0',
  gray4: '#E4E4E4',
  gray5: '#f1f5f4',
}

const GRADIENTS = {
  primary: ['#0D6EFD', '#138DBB'],
  secondary: ['#20B8C7', '#37D4D0'],
  accent: ['#FF735C', '#FF927D'],
  background: ['#F8FBFF', '#EEF7FF'],
  cardHighlight: ['#20B8C7', '#13A8B8'],
}

const FONT_SIZE = {
  xxs: 10,
  xsm: 11,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 36,
}

const FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
}

const RADIUS = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
  full: 999,
}

const ICON_SIZE = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 28,
  xl: 36,
}

const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
}

const COMPONENTS = {
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING[6],
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING[4],
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    ...SHADOWS.sm,
  },
  featureCard: {
    borderRadius: RADIUS.xl,
    padding: SPACING[5],
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  input: {
    height: 54,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING[4],
    fontSize: FONT_SIZE.sm,
    color: COLORS.textPrimary,
  },
  button: {
    height: 56,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textInverse,
  },
} as const

const STATUS = {
  confirmed: {
    backgroundColor: COLORS.successLight,
    color: COLORS.success,
    label: 'Confirmada',
  },
  scheduled: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primary,
    label: 'Agendada',
  },
  completed: {
    backgroundColor: COLORS.surfaceSoft,
    color: COLORS.textMuted,
    label: 'Realizada',
  },
  canceled: {
    backgroundColor: COLORS.dangerLight,
    color: COLORS.danger,
    label: 'Cancelada',
  },
  no_show: {
    backgroundColor: COLORS.warningLight,
    color: COLORS.warning,
    label: 'Não compareceu',
  },
}

export {
  COLORS,
  GRADIENTS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
  RADIUS,
  ICON_SIZE,
  SHADOWS,
  COMPONENTS,
  STATUS,
}
