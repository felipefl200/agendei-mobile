import { Text, View } from 'react-native'
import { STATUS } from '@/constants/theme'
import { styles } from './appointment-status-badge.styles'

type AppointmentStatus = keyof typeof STATUS

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
}

function AppointmentStatusBadge({ status }: AppointmentStatusBadgeProps) {
  const statusConfig = STATUS[status]

  return (
    <View style={[styles.container, { backgroundColor: statusConfig.backgroundColor }]}>
      <Text style={[styles.label, { color: statusConfig.color }]}>{statusConfig.label}</Text>
    </View>
  )
}

export type { AppointmentStatus, AppointmentStatusBadgeProps }
export default AppointmentStatusBadge
