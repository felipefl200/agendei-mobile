import { Pressable, Text, View } from 'react-native'
import { styles } from './appointments-tabs.styles'

type AppointmentTab = 'upcoming' | 'history'

interface AppointmentsTabsProps {
  activeTab: AppointmentTab
  onChangeTab: (tab: AppointmentTab) => void
}

const tabs: { key: AppointmentTab; label: string }[] = [
  { key: 'upcoming', label: 'Próximas' },
  { key: 'history', label: 'Histórico' },
]

function AppointmentsTabs({ activeTab, onChangeTab }: AppointmentsTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="tab"
            onPress={() => onChangeTab(tab.key)}
            style={styles.tab}
          >
            <Text style={[styles.label, isActive ? styles.activeLabel : null]}>
              {tab.label}
            </Text>
            <View style={[styles.indicator, isActive ? styles.activeIndicator : null]} />
          </Pressable>
        )
      })}
    </View>
  )
}

export type { AppointmentTab, AppointmentsTabsProps }
export default AppointmentsTabs
