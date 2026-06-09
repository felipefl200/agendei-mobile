import { Text, View } from 'react-native'
import { styles } from './appointment-date-badge.styles'

interface AppointmentDateBadgeProps {
  day: string
  month: string
  variant?: 'future' | 'past'
}

function AppointmentDateBadge({ day, month, variant = 'future' }: AppointmentDateBadgeProps) {
  const isPast = variant === 'past'

  return (
    <View style={[styles.container, isPast ? styles.pastContainer : null]}>
      <Text style={[styles.day, isPast ? styles.pastText : null]}>{day}</Text>
      <Text style={[styles.month, isPast ? styles.pastText : null]}>{month}</Text>
    </View>
  )
}

export type { AppointmentDateBadgeProps }
export default AppointmentDateBadge
