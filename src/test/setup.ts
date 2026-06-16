import { cleanup } from '@testing-library/react'
import React from 'react'
import { afterEach, vi } from 'vitest'
import { secureStoreMock } from './mocks/secureStore'

vi.mock('expo-secure-store', () => secureStoreMock)

const LucideIcon = (props: Record<string, unknown>) => React.createElement('span', props)

vi.mock('lucide-react-native', () => ({
  AtSign: LucideIcon,
  ArrowLeft: LucideIcon,
  Baby: LucideIcon,
  Bell: LucideIcon,
  CalendarDays: LucideIcon,
  Check: LucideIcon,
  ChevronLeft: LucideIcon,
  ChevronRight: LucideIcon,
  Clock: LucideIcon,
  CreditCard: LucideIcon,
  Eye: LucideIcon,
  EyeOff: LucideIcon,
  FlaskConical: LucideIcon,
  Heart: LucideIcon,
  HeartPulse: LucideIcon,
  Home: LucideIcon,
  Lock: LucideIcon,
  LockKeyhole: LucideIcon,
  Mail: LucideIcon,
  MapPin: LucideIcon,
  Menu: LucideIcon,
  MessageCircle: LucideIcon,
  Phone: LucideIcon,
  Search: LucideIcon,
  ShieldCheck: LucideIcon,
  SlidersHorizontal: LucideIcon,
  Star: LucideIcon,
  Stethoscope: LucideIcon,
  User: LucideIcon,
  UserSearch: LucideIcon,
  Venus: LucideIcon,
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
