import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import AppointmentCard from '@/components/dashboard/appointment-card'
import FeatureTile from '@/components/dashboard/feature-tile'
import SectionHeader from '@/components/dashboard/section-header'
import Icon from '@/components/icon/icon'
import { Screen } from '@/components/screen'
import { COLORS, SPACING } from '@/constants/theme'
import { useDashboardViewModel } from '@/features/dashboard/view-models/useDashboardViewModel'
import { styles } from './DashboardScreen.styles'
import { useBottomTabBarHeight } from 'expo-router/build/react-navigation/bottom-tabs'

function DashboardScreen() {
  const vm = useDashboardViewModel()
  const tabBarHeight = useBottomTabBarHeight()

  function renderHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.greeting}>
              <Text style={styles.greetingTitle}>Olá, {vm.userName}!</Text>
              <Text style={styles.greetingSubtitle}>
                Como podemos cuidar de você hoje?
              </Text>
            </View>
            <TouchableOpacity 
              disabled={vm.isLoggingOut} 
              style={styles.iconButton} 
              onPress={vm.handleLogout}
            >
              <Icon color={COLORS.textSecondary} name="logOut" size="md" />
            </TouchableOpacity>
            <View style={styles.notificationButton}>
              <Icon color={COLORS.primaryDark} name="bell" size="md" />
              <View style={styles.notificationDot} />
            </View>
          </View>
        </View>

        {vm.nextAppointmentLoading ? (
          <Text style={styles.stateText}>Carregando próxima consulta...</Text>
        ) : vm.nextAppointment ? (
          <AppointmentCard
            clinic={vm.nextAppointment.clinic}
            date={vm.nextAppointment.date}
            doctorName={vm.nextAppointment.doctorName}
            specialty={vm.nextAppointment.specialty}
            time={vm.nextAppointment.time}
            weekday={vm.nextAppointment.weekday}
          />
        ) : (
          <Text style={styles.stateText}>Você ainda não tem consultas próximas.</Text>
        )}

        <View style={styles.section}>
          <SectionHeader
            actionLabel="Ver todas"
            title="Especialidades"
            onActionPress={vm.handleSeeAllSpecialties}
          />
          <FlatList
            contentContainerStyle={{ gap: SPACING[1], paddingBottom: 2 }}
            data={vm.specialties}
            horizontal
            keyExtractor={(item) => item.title}
            renderItem={({ item: specialty }) => (
              <FeatureTile
                color={specialty.color}
                icon={specialty.icon}
                title={specialty.title}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="Ações rápidas" />
        </View>
      </View>
    )
  }

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          columnWrapperStyle={{ gap: SPACING[1], paddingVertical: SPACING[1] }}
          contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight }]}
          data={vm.quickActions}
          keyExtractor={(item) => item.title}
          ListHeaderComponent={renderHeader}
          numColumns={2}
          renderItem={({ item: action }) => (
            <FeatureTile
              color={action.color}
              compact
              icon={action.icon}
              style={styles.quickActionTile}
              title={action.title}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  )
}

export default DashboardScreen
