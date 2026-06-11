import { Pressable, Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import DoctorAvatar, { DoctorAvatarVariant } from './doctor-avatar'
import { styles } from './doctor-card.styles'

interface DoctorCardProps {
  name: string
  specialty: string
  rating?: string
  reviews?: number
  crm?: string
  availability: string
  avatarVariant?: DoctorAvatarVariant
  onPress?: () => void
}

function DoctorCard({
  name,
  specialty,
  rating,
  reviews,
  crm,
  availability,
  avatarVariant,
  onPress,
}: DoctorCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.container}>
      <DoctorAvatar variant={avatarVariant} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.specialty}>{specialty}</Text>

        {rating && typeof reviews === 'number' ? (
          <View style={styles.ratingRow}>
            <Icon color={COLORS.warning} fill={COLORS.warning} name="star" size="xs" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews} avaliações)</Text>
          </View>
        ) : crm ? (
          <Text style={styles.reviews}>CRM {crm}</Text>
        ) : null}

        <Text style={styles.availability}>{availability}</Text>
      </View>

      <View style={styles.favoriteButton}>
        <Icon color={COLORS.icon} name="heart" size="md" />
      </View>
    </Pressable>
  )
}

export type { DoctorCardProps }
export default DoctorCard
