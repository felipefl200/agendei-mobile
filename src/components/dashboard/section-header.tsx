import { Text, View } from 'react-native'
import { styles } from './section-header.styles'

interface SectionHeaderProps {
  title: string
  actionLabel?: string
}

function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
    </View>
  )
}

export type { SectionHeaderProps }
export default SectionHeader
