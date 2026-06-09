import { Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './appointment-card.styles'

interface AppointmentCardProps {
  doctorName: string
  specialty: string
  date: string
  weekday: string
  time: string
  clinic: string
}

function DoctorAvatar() {
  return (
    <View style={styles.avatar}>
      <View style={styles.avatarHair} />
      <View style={styles.avatarFace} />
      <View style={styles.avatarCoat}>
        <Icon color={COLORS.primary} name="stethoscope" size="sm" />
      </View>
    </View>
  )
}

function AppointmentCard({
  doctorName,
  specialty,
  date,
  weekday,
  time,
  clinic,
}: AppointmentCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Próxima consulta</Text>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.specialty}>{specialty}</Text>

        <View style={styles.infoRow}>
          <Icon color={COLORS.white} name="calendarDays" size="xs" />
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.infoDot}>•</Text>
          <Text style={styles.infoText}>{weekday}</Text>
          <Text style={styles.infoDot}>•</Text>
          <Text style={styles.infoText}>{time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon color={COLORS.white} name="mapPin" size="xs" />
          <Text style={styles.infoText}>{clinic}</Text>
        </View>
      </View>

      <View style={styles.side}>
        <DoctorAvatar />
        <View style={styles.detailsButton}>
          <Text style={styles.detailsText}>Ver detalhes</Text>
        </View>
      </View>
    </View>
  )
}

export type { AppointmentCardProps }
export default AppointmentCard
