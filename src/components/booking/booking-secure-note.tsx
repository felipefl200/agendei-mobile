import { Text, View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './booking-secure-note.styles'

function BookingSecureNote() {
  return (
    <View style={styles.container}>
      <Icon color={COLORS.icon} name="lock" size="xs" />
      <Text style={styles.text}>Seus dados estão seguros.</Text>
    </View>
  )
}

export default BookingSecureNote
