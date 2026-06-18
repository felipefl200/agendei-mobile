import { cleanup } from '@testing-library/react'
import React from 'react'
import { afterEach, vi } from 'vitest'
import { secureStoreMock } from './mocks/secureStore'

vi.mock('expo-secure-store', () => secureStoreMock)

vi.mock('expo-file-system', () => ({
  File: class FileMock {
    constructor(readonly uri: string) {}

    upload() {
      throw new Error('File.upload mock was not configured.')
    }
  },
  UploadType: { MULTIPART: 1 },
}))

const LucideIcon = (props: Record<string, unknown>) => React.createElement('span', props)

vi.mock('lucide-react-native', () => ({
  AtSign: LucideIcon,
  ArrowLeft: LucideIcon,
  Baby: LucideIcon,
  Bell: LucideIcon,
  CalendarDays: LucideIcon,
  Camera: LucideIcon,
  Check: LucideIcon,
  ChevronLeft: LucideIcon,
  ChevronRight: LucideIcon,
  Clock: LucideIcon,
  CreditCard: LucideIcon,
  Droplet: LucideIcon,
  Edit3: LucideIcon,
  Eye: LucideIcon,
  EyeOff: LucideIcon,
  FlaskConical: LucideIcon,
  Heart: LucideIcon,
  HeartPulse: LucideIcon,
  Home: LucideIcon,
  Image: LucideIcon,
  Lock: LucideIcon,
  LockKeyhole: LucideIcon,
  LogOut: LucideIcon,
  Mail: LucideIcon,
  MapPin: LucideIcon,
  Menu: LucideIcon,
  MessageCircle: LucideIcon,
  Phone: LucideIcon,
  Search: LucideIcon,
  Shield: LucideIcon,
  ShieldCheck: LucideIcon,
  SlidersHorizontal: LucideIcon,
  Star: LucideIcon,
  Stethoscope: LucideIcon,
  TriangleAlert: LucideIcon,
  User: LucideIcon,
  UserSearch: LucideIcon,
  Venus: LucideIcon,
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
