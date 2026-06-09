import { Pressable, Text, View } from 'react-native'
import { styles } from './time-slot-grid.styles'

interface TimeSlotGridProps {
  selectedTime: string
  times: string[]
  onSelectTime: (time: string) => void
}

function TimeSlotGrid({ selectedTime, times, onSelectTime }: TimeSlotGridProps) {
  return (
    <View style={styles.container}>
      {times.map((time) => {
        const isSelected = time === selectedTime

        return (
          <Pressable
            key={time}
            accessibilityRole="button"
            onPress={() => onSelectTime(time)}
            style={[styles.slot, isSelected ? styles.selectedSlot : null]}
          >
            <Text style={[styles.slotText, isSelected ? styles.selectedSlotText : null]}>
              {time}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export type { TimeSlotGridProps }
export default TimeSlotGrid
