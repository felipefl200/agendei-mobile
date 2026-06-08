import { styles } from '@/components/button/button.styles'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  theme?: 'primary' | 'danger'
  text?: string
}

export default function Button({ theme = 'primary', text, children, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.btn, theme === 'danger' ? styles.danger : styles.primary, style]}
      activeOpacity={0.7}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : children ? (
        children
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}
