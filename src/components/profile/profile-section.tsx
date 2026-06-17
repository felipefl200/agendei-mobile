import { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { styles } from './profile-section.styles'

interface ProfileSectionProps {
  title: string
  children: ReactNode
}

function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  )
}

export default ProfileSection
