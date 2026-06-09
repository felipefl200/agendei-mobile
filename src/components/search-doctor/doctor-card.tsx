import { Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import DoctorAvatar, { DoctorAvatarVariant } from './doctor-avatar'
import { styles } from './doctor-card.styles'

interface DoctorCardProps {
  name: string
  specialty: string
  rating: string
  reviews: number
  availability: string
  avatarVariant?: DoctorAvatarVariant
}

function DoctorCard({
  name,
  specialty,
  rating,
  reviews,
  availability,
  avatarVariant,
}: DoctorCardProps) {
  return (
    <View style={styles.container}>
      <DoctorAvatar variant={avatarVariant} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.specialty}>{specialty}</Text>

        <View style={styles.ratingRow}>
          <Icon color={COLORS.warning} fill={COLORS.warning} name="star" size="xs" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.reviews}>({reviews} avaliações)</Text>
        </View>

        <Text style={styles.availability}>{availability}</Text>
      </View>

      <View style={styles.favoriteButton}>
        <Icon color={COLORS.icon} name="heart" size="md" />
      </View>
    </View>
  )
}

export type { DoctorCardProps }
export default DoctorCard
