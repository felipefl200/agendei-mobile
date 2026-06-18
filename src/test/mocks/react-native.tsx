import React, { forwardRef } from 'react'
import { vi } from 'vitest'

type AnyProps = Record<string, any>

function mapPressableProps({
  accessibilityLabel,
  accessibilityRole,
  activeOpacity,
  hitSlop,
  onPress,
  style,
  ...props
}: AnyProps) {
  return {
    ...props,
    'aria-label': accessibilityLabel,
    'data-role': accessibilityRole,
    onClick: onPress,
  }
}

const View = forwardRef<HTMLDivElement, AnyProps>(({ style, ...props }, ref) => (
  <div ref={ref} {...props} />
))
View.displayName = 'View'

const Text = forwardRef<HTMLSpanElement, AnyProps>(({ numberOfLines, style, ...props }, ref) => (
  <span ref={ref} {...props} />
))
Text.displayName = 'Text'

const Image = forwardRef<HTMLImageElement, AnyProps>(({ source, style, ...props }, ref) => (
  <img ref={ref} src={source?.uri} {...props} />
))
Image.displayName = 'Image'

const Pressable = forwardRef<HTMLButtonElement, AnyProps>((props, ref) => (
  <button ref={ref} type="button" {...mapPressableProps(props)} />
))
Pressable.displayName = 'Pressable'

const TouchableOpacity = Pressable

const Switch = forwardRef<HTMLInputElement, AnyProps>(
  ({ onValueChange, value = false, ...props }, ref) => (
    <input
      ref={ref}
      checked={value}
      onChange={(event) => onValueChange?.(event.currentTarget.checked)}
      type="checkbox"
      {...props}
    />
  ),
)
Switch.displayName = 'Switch'

const Modal = ({ children, visible = true }: AnyProps) => (visible ? <div>{children}</div> : null)

const TextInput = forwardRef<HTMLInputElement, AnyProps>(
  (
    {
      editable = true,
      onBlur,
      onChange,
      onChangeText,
      onFocus,
      placeholderTextColor,
      secureTextEntry,
      style,
      hitSlop,
      ...props
    },
    ref,
  ) => (
    <input
      ref={ref}
      disabled={!editable}
      onBlur={onBlur}
      onChange={(event) => {
        onChange?.(event)
        onChangeText?.(event.currentTarget.value)
      }}
      onFocus={onFocus}
      type={secureTextEntry ? 'password' : 'text'}
      {...props}
    />
  ),
)
TextInput.displayName = 'TextInput'

const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T) => styles,
  flatten: (style: unknown) => style,
}

const Platform = {
  OS: 'ios',
  select: <T,>(values: { default?: T; ios?: T; android?: T; web?: T }) =>
    values.ios ?? values.default,
}

const Alert = {
  alert: vi.fn(),
}

export {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
}
