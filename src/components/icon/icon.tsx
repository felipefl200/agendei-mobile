import {
  AtSign,
  Baby,
  Bell,
  CalendarDays,
  CreditCard,
  Eye,
  EyeOff,
  HeartPulse,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Stethoscope,
  User,
  type LucideProps,
} from 'lucide-react-native'
import { COLORS, ICON_SIZE } from '@/constants/theme'

const ICONS = {
  atSign: AtSign,
  baby: Baby,
  bell: Bell,
  calendarDays: CalendarDays,
  creditCard: CreditCard,
  eye: Eye,
  eyeOff: EyeOff,
  heartPulse: HeartPulse,
  home: Home,
  lockKeyhole: LockKeyhole,
  mail: Mail,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  phone: Phone,
  search: Search,
  shieldCheck: ShieldCheck,
  stethoscope: Stethoscope,
  user: User,
} as const

type IconName = keyof typeof ICONS
type IconSizeName = keyof typeof ICON_SIZE

interface IconProps extends Omit<LucideProps, 'color' | 'size'> {
  name: IconName
  color?: string
  size?: IconSizeName | number
}

function Icon({ name, color = COLORS.icon, size = 'md', strokeWidth = 2, ...rest }: IconProps) {
  const LucideIcon = ICONS[name]
  const iconSize = typeof size === 'number' ? size : ICON_SIZE[size]

  return <LucideIcon color={color} size={iconSize} strokeWidth={strokeWidth} {...rest} />
}

export type { IconName, IconProps }
export default Icon
