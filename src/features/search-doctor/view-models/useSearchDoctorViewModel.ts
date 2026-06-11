import { useRouter } from 'expo-router'
import { useState } from 'react'
import { DoctorAvatarVariant } from '@/components/search-doctor/doctor-avatar'
import { useDoctors } from '@/hooks/useDoctors'
import { useSpecialties } from '@/hooks/useSpecialties'

interface SearchDoctorSpecialtyFilter {
  id: string | null
  label: string
  active: boolean
}

interface SearchDoctorItem {
  id: string
  name: string
  specialty: string
  crm: string
  availability: string
  avatarVariant: DoctorAvatarVariant
}

/**
 * ViewModel da tela de Busca de Medicos.
 * Encapsula busca, filtros por especialidade, listagem de medicos e selecao para agendamento.
 */
interface SearchDoctorViewModel {
  query: string
  doctors: SearchDoctorItem[]
  specialties: SearchDoctorSpecialtyFilter[]
  loading: boolean
  error: string | null
  setQuery: (value: string) => void
  handleSelectSpecialty: (specialtyId: string | null) => void
  handleSelectDoctor: (doctorId: string) => void
}

const avatarVariants: DoctorAvatarVariant[] = ['femaleA', 'maleA', 'femaleB', 'femaleC']

function getDoctorAvatarVariant(index: number) {
  return avatarVariants[index % avatarVariants.length]
}

function useSearchDoctorViewModel(): SearchDoctorViewModel {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null)
  const specialtiesQuery = useSpecialties()
  const doctorsQuery = useDoctors({
    page: 1,
    perPage: 20,
    search: query,
    specialtyId: selectedSpecialtyId ?? undefined,
  })

  function handleSelectSpecialty(specialtyId: string | null) {
    setSelectedSpecialtyId(specialtyId)
  }

  function handleSelectDoctor(doctorId: string) {
    router.push({
      pathname: '/booking',
      params: {
        doctorId,
      },
    })
  }

  return {
    query,
    doctors: (doctorsQuery.data?.doctors ?? []).map((doctor, index) => ({
      id: doctor.id,
      availability: doctor.availableToday ? 'Disponível hoje' : 'Ver horários',
      avatarVariant: getDoctorAvatarVariant(index),
      crm: doctor.crm,
      name: doctor.name,
      specialty: doctor.specialty.name,
    })),
    specialties: [
      {
        id: null,
        label: 'Todos',
        active: !selectedSpecialtyId,
      },
      ...(specialtiesQuery.data ?? []).map((specialty) => ({
        id: specialty.id,
        label: specialty.name,
        active: selectedSpecialtyId === specialty.id,
      })),
    ],
    loading: doctorsQuery.isLoading,
    error: doctorsQuery.isError ? 'Não foi possível carregar os médicos.' : null,
    setQuery,
    handleSelectSpecialty,
    handleSelectDoctor,
  }
}

export type { SearchDoctorItem, SearchDoctorSpecialtyFilter, SearchDoctorViewModel }
export { useSearchDoctorViewModel }
