import { ScrollView, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from '@/components/icon/icon'
import Input from '@/components/input/input'
import DoctorCard from '@/components/search-doctor/doctor-card'
import { DoctorAvatarVariant } from '@/components/search-doctor/doctor-avatar'
import FilterChip from '@/components/search-doctor/filter-chip'
import { COLORS } from '@/constants/theme'
import { styles } from './search-doctor.styles'

const filters = ['Todos', 'Clínica Geral', 'Pediatria', 'Ginecologia']

const doctors: {
  name: string
  specialty: string
  rating: string
  reviews: number
  availability: string
  avatarVariant: DoctorAvatarVariant
}[] = [
  {
    name: 'Dra. Juliana Martins',
    specialty: 'Clínica Geral',
    rating: '4,9',
    reviews: 128,
    availability: 'Disponível hoje',
    avatarVariant: 'femaleA',
  },
  {
    name: 'Dr. Rafael Souza',
    specialty: 'Cardiologia',
    rating: '4,8',
    reviews: 96,
    availability: 'Disponível amanhã',
    avatarVariant: 'maleA',
  },
  {
    name: 'Dra. Camila Lemos',
    specialty: 'Pediatria',
    rating: '4,9',
    reviews: 210,
    availability: 'Disponível hoje',
    avatarVariant: 'femaleB',
  },
  {
    name: 'Dra. Beatriz Nunes',
    specialty: 'Ginecologia',
    rating: '4,7',
    reviews: 87,
    availability: 'Disponível sexta',
    avatarVariant: 'femaleC',
  },
]

function SearchDoctor() {
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
              placeholder="Buscar médicos ou especialidades"
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
            {filters.map((filter, index) => (
              <FilterChip key={filter} active={index === 0} label={filter} />
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Médicos disponíveis</Text>
          </View>

          <View style={styles.doctorList}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.name} {...doctor} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default SearchDoctor
