import { Tabs } from 'expo-router'
import { Platform, type ColorValue } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'

function tabIcon(name: IconName) {
  return function TabIcon({ color, focused }: { color: ColorValue; focused: boolean }) {
    const iconColor = String(color)

    return <Icon color={iconColor} fill={focused ? iconColor : 'none'} name={name} size="md" />
  }
}

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const bottomPadding = Platform.OS === 'ios' ? Math.max(insets.bottom, SPACING[2]) : SPACING[1]
  const tabBarHeight = Platform.OS === 'ios' ? 64 + bottomPadding : 64

  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: FONT_SIZE.xxs,
          fontWeight: FONT_WEIGHT.bold,
          lineHeight: 14,
        },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.borderSoft,
          height: tabBarHeight,
          paddingBottom: bottomPadding,
          paddingTop: SPACING[2],
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Início',
          tabBarIcon: tabIcon('home'),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: tabIcon('search'),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Consultas',
          tabBarIcon: tabIcon('calendarDays'),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: 'Agendar',
          tabBarIcon: tabIcon('calendarDays'),
        }}
      />
    </Tabs>
  )
}
