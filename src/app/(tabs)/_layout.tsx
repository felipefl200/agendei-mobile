import { Tabs } from 'expo-router'
import { type ColorValue } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'

function tabIcon(name: IconName) {
  return function TabIcon({ color }: { color: ColorValue }) {
    const iconColor = String(color)

    return (
      <Icon color={iconColor} name={name} size="md" />
    )
  }
}

export default function TabLayout() {
  const insets = useSafeAreaInsets()
  const bottomPadding = Math.max(insets.bottom, SPACING[2])
  const tabBarHeight = 56 + bottomPadding

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
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: tabIcon('user'),
        }}
      />
    </Tabs>
  )
}
