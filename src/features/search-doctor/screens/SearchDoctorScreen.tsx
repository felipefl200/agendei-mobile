import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import DoctorCard from '@/components/search-doctor/doctor-card'
import FilterChip from '@/components/search-doctor/filter-chip'
import { COLORS } from '@/constants/theme'
import { useSearchDoctorViewModel } from '@/features/search-doctor/view-models/useSearchDoctorViewModel'
import { styles } from './SearchDoctorScreen.styles'

function SearchDoctorScreen() {
  const vm = useSearchDoctorViewModel()

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconButton}>
              <Icon color={COLORS.primaryDark} name="arrowLeft" size="md" />
            </View>

            <Input
              autoCapitalize="none"
              containerStyle={styles.searchInputContainer}
              fieldStyle={styles.searchInputField}
              inputStyle={styles.searchInput}
              leftIcon={<Icon color={COLORS.textMuted} name="search" size="sm" />}
              onChangeText={vm.setQuery}
              placeholder="Buscar médicos ou especialidades"
              value={vm.query}
            />

            <View style={styles.iconButton}>
              <Icon color={COLORS.primaryDark} name="slidersHorizontal" size="md" />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.filtersContent}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {vm.specialties.map((specialty) => (
              <FilterChip
                key={specialty.id ?? 'all'}
                active={specialty.active}
                label={specialty.label}
                onPress={() => vm.handleSelectSpecialty(specialty.id)}
              />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Médicos disponíveis</Text>
          </View>

          <View style={styles.doctorList}>
            {vm.loading ? (
              <Text style={styles.stateText}>Carregando médicos...</Text>
            ) : vm.error ? (
              <Text style={styles.stateText}>{vm.error}</Text>
            ) : vm.doctors.length === 0 ? (
              <Text style={styles.stateText}>Nenhum médico encontrado.</Text>
            ) : (
              vm.doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  availability={doctor.availability}
                  avatarVariant={doctor.avatarVariant}
                  crm={doctor.crm}
                  name={doctor.name}
                  onPress={() => vm.handleSelectDoctor(doctor.id)}
                  specialty={doctor.specialty}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SearchDoctorScreen
