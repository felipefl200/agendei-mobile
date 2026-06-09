import { Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import DoctorAvatar from '@/components/search-doctor/doctor-avatar'
import { COLORS } from '@/constants/theme'
import { styles } from './booking-doctor-summary.styles'

interface BookingDoctorSummaryProps {
  name: string
  specialty: string
  rating: string
  reviews: number
  clinic: string
}

function BookingDoctorSummary({
  name,
  specialty,
  rating,
  reviews,
  clinic,
}: BookingDoctorSummaryProps) {
  return (
    <View style={styles.container}>
      <DoctorAvatar variant="femaleA" />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>

        <View style={styles.infoRow}>
          <Icon color={COLORS.warning} fill={COLORS.warning} name="star" size="xs" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.muted}>({reviews} avaliações)</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon color={COLORS.primary} name="mapPin" size="xs" />
          <Text style={styles.clinic}>{clinic}</Text>
        </View>
      </View>
    </View>
  )
}

export type { BookingDoctorSummaryProps }
export default BookingDoctorSummary
