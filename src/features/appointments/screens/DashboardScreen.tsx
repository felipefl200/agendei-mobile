import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentCard from '@/components/dashboard/appointment-card'
import FeatureTile from '@/components/dashboard/feature-tile'
import SectionHeader from '@/components/dashboard/section-header'
import Icon from '@/components/icon/icon'
import { COLORS, SPACING } from '@/constants/theme'
import { useDashboardViewModel } from '@/features/appointments/view-models/useDashboardViewModel'
import { styles } from './DashboardScreen.styles'

function DashboardScreen() {
  const vm = useDashboardViewModel()

  function renderHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconButton} />
          <View style={styles.notificationButton}>
            <Icon color={COLORS.primaryDark} name="bell" size="md" />
            <View style={styles.notificationDot} />
          </View>
        </View>

        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>Olá, {vm.userName}!</Text>
          <Text style={styles.greetingSubtitle}>Como podemos cuidar de você hoje?</Text>
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
            contentContainerStyle={{ gap: SPACING[2] }}
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
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          columnWrapperStyle={{ gap: SPACING[2] }}
          contentContainerStyle={styles.content}
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
    </SafeAreaView>
  )
}

export default DashboardScreen
