import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import DoctorCard from '@/components/search-doctor/doctor-card'
import { DoctorAvatarVariant } from '@/components/search-doctor/doctor-avatar'
import FilterChip from '@/components/search-doctor/filter-chip'
import { COLORS } from '@/constants/theme'
import { Doctor } from '@/domain/entities/doctor'
import { useDoctors } from '@/hooks/useDoctors'
import { useSpecialties } from '@/hooks/useSpecialties'
import { styles } from './search-doctor.styles'

const avatarVariants: DoctorAvatarVariant[] = ['femaleA', 'maleA', 'femaleB', 'femaleC']

function getDoctorAvatarVariant(index: number) {
  return avatarVariants[index % avatarVariants.length]
}

function SearchDoctor() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | undefined>()
  const specialtiesQuery = useSpecialties()
  const doctorsQuery = useDoctors({
    page: 1,
    perPage: 20,
    search,
    specialtyId: selectedSpecialtyId,
  })
  const doctors = doctorsQuery.data?.doctors ?? []

  function handleSelectDoctor(doctor: Doctor) {
    router.push({
      pathname: '/booking',
      params: {
        doctorId: doctor.id,
      },
    })
  }

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
              onChangeText={setSearch}
              placeholder="Buscar médicos ou especialidades"
              value={search}
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
            <FilterChip
              active={!selectedSpecialtyId}
              label="Todos"
              onPress={() => setSelectedSpecialtyId(undefined)}
            />
            {(specialtiesQuery.data ?? []).map((specialty) => (
              <FilterChip
                key={specialty.id}
                active={selectedSpecialtyId === specialty.id}
                label={specialty.name}
                onPress={() => setSelectedSpecialtyId(specialty.id)}
              />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Médicos disponíveis</Text>
          </View>

          <View style={styles.doctorList}>
            {doctorsQuery.isLoading ? (
              <Text style={styles.stateText}>Carregando médicos...</Text>
            ) : doctorsQuery.isError ? (
              <Text style={styles.stateText}>Não foi possível carregar os médicos.</Text>
            ) : doctors.length === 0 ? (
              <Text style={styles.stateText}>Nenhum médico encontrado.</Text>
            ) : (
              doctors.map((doctor, index) => (
                <DoctorCard
                  key={doctor.id}
                  availability={doctor.availableToday ? 'Disponível hoje' : 'Ver horários'}
                  avatarVariant={getDoctorAvatarVariant(index)}
                  crm={doctor.crm}
                  name={doctor.name}
                  onPress={() => handleSelectDoctor(doctor)}
                  specialty={doctor.specialty.name}
                />
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SearchDoctor
