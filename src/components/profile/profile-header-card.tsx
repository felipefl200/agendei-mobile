import { Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './profile-header-card.styles'

interface ProfileHeaderCardProps {
  name: string
  email: string
  avatarInitials: string
  avatarUrl: string | null
  isUploadingAvatar?: boolean
  onAvatarPress: () => void
  onEditPress: () => void
}

function ProfileHeaderCard({
  avatarInitials,
  avatarUrl,
  email,
  isUploadingAvatar = false,
  name,
  onAvatarPress,
  onEditPress,
}: ProfileHeaderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        )}
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text numberOfLines={1} style={styles.email}>{email}</Text>
        <View style={styles.avatarActions}>
          <TouchableOpacity
            activeOpacity={0.75}
            accessibilityLabel="Alterar foto"
            accessibilityRole="button"
            disabled={isUploadingAvatar}
            onPress={onAvatarPress}
            style={styles.avatarButton}
          >
            <Icon color={COLORS.primaryDark} name="camera" size="sm" />
            <Text style={styles.avatarButtonText}>
              {isUploadingAvatar ? 'Enviando...' : 'Alterar foto'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.75} onPress={onEditPress} style={styles.editButton}>
          <Icon color={COLORS.secondaryDark} name="edit" size="sm" />
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileHeaderCard
