import { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './profile-row.styles'

interface ProfileRowProps {
  icon: IconName
  label: string
  value?: string
  onPress?: () => void
  rightElement?: ReactNode
}

function ProfileRow({ icon, label, onPress, rightElement, value }: ProfileRowProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={styles.row}
    >
      <Icon color={COLORS.secondaryDark} name={icon} size="md" />
      <Text style={styles.label}>{label}</Text>
      <View style={styles.trailing}>
        {rightElement ?? (
          <>
            <Text numberOfLines={1} style={styles.value}>
              {value || 'Nao informado'}
            </Text>
            {onPress ? <Icon color={COLORS.primaryDark} name="chevronRight" size="sm" /> : null}
          </>
        )}
      </View>
    </Pressable>
  )
}

export default ProfileRow
