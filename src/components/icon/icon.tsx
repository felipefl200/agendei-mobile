import {
  AtSign,
  ArrowLeft,
  Baby,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  FlaskConical,
  HeartPulse,
  Heart,
  Home,
  Lock,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Stethoscope,
  User,
  UserSearch,
  Venus,
  type LucideProps,
} from 'lucide-react-native'
import { COLORS, ICON_SIZE } from '@/constants/theme'

const ICONS = {
  atSign: AtSign,
  arrowLeft: ArrowLeft,
  baby: Baby,
  bell: Bell,
  calendarDays: CalendarDays,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clock: Clock,
  creditCard: CreditCard,
  eye: Eye,
  eyeOff: EyeOff,
  flaskConical: FlaskConical,
  heart: Heart,
  heartPulse: HeartPulse,
  home: Home,
  lock: Lock,
  lockKeyhole: LockKeyhole,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  messageCircle: MessageCircle,
  phone: Phone,
  search: Search,
  shieldCheck: ShieldCheck,
  slidersHorizontal: SlidersHorizontal,
  star: Star,
  stethoscope: Stethoscope,
  user: User,
  userSearch: UserSearch,
  venus: Venus,
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
