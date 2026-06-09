import { View } from 'react-native'
import Icon from '@/components/icon/icon'
import { COLORS } from '@/constants/theme'
import { styles } from './doctor-avatar.styles'

type DoctorAvatarVariant = 'femaleA' | 'maleA' | 'femaleB' | 'femaleC'

interface DoctorAvatarProps {
  variant?: DoctorAvatarVariant
}

const variantStyles = {
  femaleA: styles.hairLong,
  maleA: styles.hairShort,
  femaleB: styles.hairWide,
  femaleC: styles.hairSoft,
}

function DoctorAvatar({ variant = 'femaleA' }: DoctorAvatarProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.hair, variantStyles[variant]]} />
      <View style={styles.face} />
      <View style={styles.coat}>
        <Icon color={COLORS.primary} name="stethoscope" size="sm" />
      </View>
    </View>
  )
}

export type { DoctorAvatarProps, DoctorAvatarVariant }
export default DoctorAvatar
