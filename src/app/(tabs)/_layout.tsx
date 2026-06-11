import { Tabs } from 'expo-router'
import type { ColorValue } from 'react-native'
import Icon, { IconName } from '@/components/icon/icon'
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from '@/constants/theme'

function tabIcon(name: IconName) {
  return function TabIcon({ color, focused }: { color: ColorValue; focused: boolean }) {
    const iconColor = String(color)

    return <Icon color={iconColor} fill={focused ? iconColor : 'none'} name={name} size="md" />
  }
}

export default function TabLayout() {
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
        },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.borderSoft,
          height: 74,
          paddingBottom: SPACING[2],
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
