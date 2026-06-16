import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './section-header.styles'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
  onActionPress?: () => void
}

function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && onActionPress ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export type { SectionHeaderProps }
export default SectionHeader
