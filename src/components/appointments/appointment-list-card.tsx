import { Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import AppointmentDateBadge from './appointment-date-badge'
import AppointmentStatusBadge, { AppointmentStatus } from './appointment-status-badge'
import { styles } from './appointment-list-card.styles'

interface AppointmentListCardProps {
  day: string
  month: string
  doctorName: string
  specialty: string
  time: string
  clinic: string
  status: AppointmentStatus
  variant?: 'future' | 'past'
}

function AppointmentListCard({
  day,
  month,
  doctorName,
  specialty,
  time,
  clinic,
  status,
  variant = 'future',
}: AppointmentListCardProps) {
  return (
    <View style={styles.container}>
      <AppointmentDateBadge day={day} month={month} variant={variant} />

      <View style={styles.content}>
        <Text style={styles.doctorName} numberOfLines={1}>
          {doctorName}
        </Text>
        <Text style={styles.specialty}>{specialty}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{time}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText} numberOfLines={1}>
            {clinic}
          </Text>
        </View>

        <AppointmentStatusBadge status={status} />
      </View>

      <View style={styles.chevron}>
        <Icon color={COLORS.primaryDark} name="chevronRight" size="sm" />
      </View>
    </View>
  )
}

export type { AppointmentListCardProps }
export default AppointmentListCard
