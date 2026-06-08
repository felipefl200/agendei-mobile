import { forwardRef, ForwardedRef, ReactNode, useState } from 'react'
import {
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { COLORS } from '@/constants/theme'
import Icon from '@/components/icon/icon'
import { styles } from './input.styles'

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: ReactNode
  rightElement?: ReactNode
  canToggleSecureTextEntry?: boolean
  containerStyle?: StyleProp<ViewStyle>
  fieldStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
}

function InputComponent(
  {
    label,
    helperText,
    error,
    leftIcon,
    rightElement,
    canToggleSecureTextEntry = true,
    containerStyle,
    fieldStyle,
    inputStyle,
    editable = true,
    onBlur,
    onFocus,
    placeholderTextColor = COLORS.textMuted,
    secureTextEntry,
    ...rest
  }: InputProps,
  ref: ForwardedRef<TextInput>,
) {
  const [isFocused, setIsFocused] = useState(false)
  const [isTextVisible, setIsTextVisible] = useState(false)
  const hasError = Boolean(error)
  const supportingText = error || helperText
  const shouldShowSecureToggle = Boolean(secureTextEntry && canToggleSecureTextEntry && !rightElement)
  const isSecureTextEntry = Boolean(secureTextEntry && !isTextVisible)

  const handleFocus: NonNullable<TextInputProps['onFocus']> = (event) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const handleBlur: NonNullable<TextInputProps['onBlur']> = (event) => {
    setIsFocused(false)
    onBlur?.(event)
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.field,
          isFocused ? styles.fieldFocused : null,
          hasError ? styles.fieldError : null,
          !editable ? styles.fieldDisabled : null,
          fieldStyle,
        ]}
      >
        {leftIcon ? <View style={styles.iconSlot}>{leftIcon}</View> : null}
        <TextInput
          ref={ref}
          editable={editable}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isSecureTextEntry}
          style={[styles.input, inputStyle]}
          {...rest}
        />
        {shouldShowSecureToggle ? (
          <Pressable
            accessibilityLabel={isTextVisible ? 'Ocultar senha' : 'Mostrar senha'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setIsTextVisible((currentValue) => !currentValue)}
            style={styles.iconButton}
          >
            <Icon
              color={isFocused ? COLORS.primary : COLORS.icon}
              name={isTextVisible ? 'eyeOff' : 'eye'}
              size="md"
            />
          </Pressable>
        ) : null}
        {rightElement ? <View style={styles.iconSlot}>{rightElement}</View> : null}
      </View>

      {supportingText ? (
        <Text style={[styles.helperText, hasError ? styles.errorText : null]}>
          {supportingText}
        </Text>
      ) : null}
    </View>
  )
}

const Input = forwardRef<TextInput, InputProps>(InputComponent)

Input.displayName = 'Input'

export type { InputProps }
export default Input
