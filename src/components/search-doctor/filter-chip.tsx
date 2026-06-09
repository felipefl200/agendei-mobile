import { Text, View } from 'react-native'
import { styles } from './filter-chip.styles'

interface FilterChipProps {
  label: string
  active?: boolean
}

function FilterChip({ label, active = false }: FilterChipProps) {
  return (
    <View style={[styles.container, active ? styles.activeContainer : null]}>
      <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
    </View>
  )
}

export type { FilterChipProps }
export default FilterChip
