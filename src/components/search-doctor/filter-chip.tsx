import { Pressable, Text } from 'react-native'
import { styles } from './filter-chip.styles'

interface FilterChipProps {
  label: string
  active?: boolean
  onPress?: () => void
}

function FilterChip({ label, active = false, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.container, active ? styles.activeContainer : null]}
    >
      <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
    </Pressable>
  )
}

export type { FilterChipProps }
export default FilterChip
