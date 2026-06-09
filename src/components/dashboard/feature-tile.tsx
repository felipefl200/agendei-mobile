import { StyleProp, Text, View, ViewStyle } from 'react-native'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './feature-tile.styles'

interface FeatureTileProps {
  title: string
  icon: IconName
  color?: string
  compact?: boolean
  style?: StyleProp<ViewStyle>
}

function FeatureTile({
  title,
  icon,
  color = COLORS.primary,
  compact = false,
  style,
}: FeatureTileProps) {
  return (
    <View style={[styles.container, compact ? styles.compactContainer : null, style]}>
      <View style={[styles.iconSurface, { backgroundColor: `${color}14` }]}>
        <Icon color={color} name={icon} size={compact ? 'md' : 'lg'} />
      </View>
      <Text style={[styles.title, compact ? styles.compactTitle : null]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  )
}

export type { FeatureTileProps }
export default FeatureTile
