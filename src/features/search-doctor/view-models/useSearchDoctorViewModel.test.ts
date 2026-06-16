import { act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { doctorFixture, specialtyFixture } from '@/test/fixtures'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { resetExpoRouterMock, routerMock } from '@/test/mocks/expo-router'
import { useSearchDoctorViewModel } from './useSearchDoctorViewModel'

const hooksMock = vi.hoisted(() => ({
  useDoctors: vi.fn(),
  useSpecialties: vi.fn(),
}))

vi.mock('@/features/shared/hooks/useDoctors', () => ({
  useDoctors: hooksMock.useDoctors,
}))

vi.mock('@/features/shared/hooks/useSpecialties', () => ({
  useSpecialties: hooksMock.useSpecialties,
}))

describe('useSearchDoctorViewModel', () => {
  beforeEach(() => {
    resetExpoRouterMock()
    hooksMock.useDoctors.mockReturnValue({
      data: { doctors: [doctorFixture], page: 1, perPage: 20, total: 1 },
      isError: false,
      isLoading: false,
    })
    hooksMock.useSpecialties.mockReturnValue({
      data: [specialtyFixture],
      isLoading: false,
    })
  })

  it('builds initial state, all filter and mapped doctors', () => {
    const { result } = renderHookWithProviders(() => useSearchDoctorViewModel())

    expect(result.current.query).toBe('')
    expect(result.current.specialties).toEqual([
      { active: true, id: null, label: 'Todos' },
      { active: false, id: 'specialty-1', label: 'Cardiologia' },
    ])
    expect(result.current.doctors[0]).toMatchObject({
      availability: 'Disponível hoje',
      avatarVariant: 'femaleA',
      crm: '12345',
      id: 'doctor-1',
      name: 'Dra. Clara',
      specialty: 'Cardiologia',
    })
  })

  it('updates query and active specialty filter', () => {
    const { result } = renderHookWithProviders(() => useSearchDoctorViewModel())

    act(() => {
      result.current.setQuery('clara')
      result.current.handleSelectSpecialty('specialty-1')
    })

    expect(result.current.query).toBe('clara')
    expect(result.current.specialties[0].active).toBe(false)
    expect(result.current.specialties[1].active).toBe(true)
  })

  it('navigates to booking with doctorId', () => {
    const { result } = renderHookWithProviders(() => useSearchDoctorViewModel())

    act(() => {
      result.current.handleSelectDoctor('doctor-1')
    })

    expect(routerMock.push).toHaveBeenCalledWith({
      params: { doctorId: 'doctor-1' },
      pathname: '/booking',
    })
  })

  it('returns friendly error when doctors query fails', () => {
    hooksMock.useDoctors.mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    })

    const { result } = renderHookWithProviders(() => useSearchDoctorViewModel())

    expect(result.current.error).toBe('Não foi possível carregar os médicos.')
  })
})
