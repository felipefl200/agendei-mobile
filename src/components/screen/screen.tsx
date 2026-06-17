import type { ReactNode } from 'react'
import {
  ScrollView,
  StyleSheet,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
  KeyboardToolbar,
} from 'react-native-keyboard-controller'
import { SafeAreaView, type Edge } from 'react-native-safe-area-context'
import { COLORS, SPACING } from '@/constants/theme'

type ScreenProps = {
  children: ReactNode
  edges?: Edge[]
  style?: StyleProp<ViewStyle>
}

type ScrollScreenProps = Omit<ScrollViewProps, 'contentContainerStyle'> & {
  children: ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
  edges?: Edge[]
}

type KeyboardScrollScreenProps = Omit<
  KeyboardAwareScrollViewProps,
  'contentContainerStyle'
> & {
  children: ReactNode
  contentContainerStyle?: StyleProp<ViewStyle>
  edges?: Edge[]
  toolbar?: boolean
}

const DEFAULT_EDGES: Edge[] = ['top']
const FORM_EDGES: Edge[] = ['top']
const KEYBOARD_TOOLBAR_HEIGHT = 48

export function Screen({ children, edges = DEFAULT_EDGES, style }: ScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[styles.root, style]}>
      {children}
    </SafeAreaView>
  )
}

export function ScrollScreen({
  children,
  contentContainerStyle,
  edges = DEFAULT_EDGES,
  showsVerticalScrollIndicator = false,
  style,
  ...props
}: ScrollScreenProps) {
  return (
    <Screen edges={edges}>
      <ScrollView
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={[styles.root, style]}
        {...props}
      >
        {children}
      </ScrollView>
    </Screen>
  )
}

export function KeyboardScrollScreen({
  bottomOffset = SPACING[6],
  children,
  contentContainerStyle,
  edges = FORM_EDGES,
  extraKeyboardSpace,
  keyboardDismissMode = 'on-drag',
  keyboardShouldPersistTaps = 'handled',
  showsVerticalScrollIndicator = false,
  mode = 'layout',
  style,
  toolbar = false,
  ...props
}: KeyboardScrollScreenProps) {
  const resolvedExtraKeyboardSpace =
    extraKeyboardSpace ?? (toolbar ? KEYBOARD_TOOLBAR_HEIGHT : 0)

  return (
    <Screen edges={edges}>
      <KeyboardAwareScrollView
        bottomOffset={bottomOffset}
        contentContainerStyle={contentContainerStyle}
        extraKeyboardSpace={resolvedExtraKeyboardSpace}
        mode={mode}
        keyboardDismissMode={keyboardDismissMode}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={[styles.root, style]}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
      {toolbar ? <KeyboardToolbar /> : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
})
