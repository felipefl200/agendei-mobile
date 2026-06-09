import { Text, View } from 'react-native'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './bottom-navigation.styles'

interface BottomNavigationItem {
  key: string
  label: string
  icon: IconName
}

interface BottomNavigationProps {
  activeKey: string
  items: BottomNavigationItem[]
}

function BottomNavigation({ activeKey, items }: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.key === activeKey
        const color = isActive ? COLORS.primary : COLORS.textMuted

        return (
          <View key={item.key} style={styles.item}>
            <Icon color={color} fill={isActive ? color : 'none'} name={item.icon} size="md" />
            <Text style={[styles.label, isActive ? styles.activeLabel : null]}>{item.label}</Text>
          </View>
        )
      })}
    </View>
  )
}

export type { BottomNavigationItem, BottomNavigationProps }
export default BottomNavigation
