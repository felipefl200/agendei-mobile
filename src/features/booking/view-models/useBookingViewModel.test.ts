import { act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppError } from '@/domain/errors/AppError'
import { doctorFixture, specialtyFixture } from '@/test/fixtures'
import { resetExpoRouterMock, routerMock, setLocalSearchParams } from '@/test/mocks/expo-router'
import { renderHookWithProviders } from '@/test/renderHookWithProviders'
import { useBookingViewModel } from './useBookingViewModel'

const hooksMock = vi.hoisted(() => ({
  mutateAsync: vi.fn(),
  useCreateAppointment: vi.fn(),
  useDoctor: vi.fn(),
  useDoctorAvailability: vi.fn(),
  useDoctors: vi.fn(),
  useSpecialties: vi.fn(),
}))

vi.mock('@/features/booking/hooks/useCreateAppointment', () => ({
  useCreateAppointment: hooksMock.useCreateAppointment,
}))

vi.mock('@/features/booking/hooks/useDoctorAvailability', () => ({
  useDoctorAvailability: hooksMock.useDoctorAvailability,
}))

vi.mock('@/features/shared/hooks/useDoctors', () => ({
  useDoctor: hooksMock.useDoctor,
  useDoctors: hooksMock.useDoctors,
}))

vi.mock('@/features/shared/hooks/useSpecialties', () => ({
  useSpecialties: hooksMock.useSpecialties,
}))

describe('useBookingViewModel', () => {
  beforeEach(() => {
    resetExpoRouterMock()
    setLocalSearchParams({})
    hooksMock.mutateAsync.mockResolvedValue({})
    hooksMock.useCreateAppointment.mockReturnValue({
      isPending: false,
      mutateAsync: hooksMock.mutateAsync,
    })
    hooksMock.useDoctor.mockReturnValue({ data: undefined, isError: false, isLoading: false })
    hooksMock.useDoctorAvailability.mockReturnValue({
      data: { slots: [{ available: true, time: '09:00' }, { available: false, time: '10:00' }] },
      isError: false,
      isLoading: false,
    })
    hooksMock.useDoctors.mockReturnValue({
      data: { doctors: [doctorFixture], page: 1, perPage: 20, total: 1 },
      isLoading: false,
    })
    hooksMock.useSpecialties.mockReturnValue({ data: [specialtyFixture], isLoading: false })
  })

  it('starts without doctor param and keeps doctors list enabled', () => {
    const { result } = renderHookWithProviders(() => useBookingViewModel())

    expect(result.current.hasDoctorParam).toBe(false)
    expect(result.current.step).toBe('doctor')
    expect(result.current.doctors).toEqual([doctorFixture])
    expect(hooksMock.useDoctors).toHaveBeenCalledWith(
      { page: 1, perPage: 20, specialtyId: undefined },
      { enabled: true },
    )
  })

  it('uses doctor param and disables full doctors list query', () => {
    setLocalSearchParams({ doctorId: 'doctor-1' })
    hooksMock.useDoctor.mockReturnValue({ data: doctorFixture, isError: false, isLoading: false })

    const { result } = renderHookWithProviders(() => useBookingViewModel())

    expect(result.current.hasDoctorParam).toBe(true)
    expect(result.current.selectedDoctor).toBe(doctorFixture)
    expect(hooksMock.useDoctors).toHaveBeenCalledWith(
      { page: 1, perPage: 20, specialtyId: undefined },
      { enabled: false },
    )
  })

  it('selects specialty, doctor, date and resets unavailable selected slot', () => {
    const { result } = renderHookWithProviders(() => useBookingViewModel())

    act(() => {
      result.current.handleSelectSpecialty(specialtyFixture)
      result.current.handleSelectDoctor(doctorFixture)
      result.current.handleSelectSlot('09:00')
    })

    expect(result.current.selectedSpecialty).toBe(specialtyFixture)
    expect(result.current.selectedDoctor).toBe(doctorFixture)
    expect(result.current.selectedSlot).toBe('09:00')

    act(() => {
      result.current.handleSelectDate('2026-06-16')
    })

    expect(result.current.selectedSlot).toBe('')
  })

  it('blocks confirmation without doctor or slot and creates appointment on success', async () => {
    const { result } = renderHookWithProviders(() => useBookingViewModel())

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(result.current.error).toBe('Escolha um médico para agendar.')

    act(() => {
      result.current.handleSelectDoctor(doctorFixture)
    })

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(result.current.error).toBe('Escolha um horário disponível.')

    act(() => {
      result.current.handleSelectSlot('09:00')
    })

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(hooksMock.mutateAsync).toHaveBeenCalledWith({
      clinicId: 'clinic-1',
      date: result.current.selectedDate,
      doctorId: 'doctor-1',
      specialtyId: 'specialty-1',
      startTime: '09:00',
    })
    expect(routerMock.replace).toHaveBeenCalledWith('/appointments')
  })

  it('shows friendly mutation error', async () => {
    hooksMock.mutateAsync.mockRejectedValue(
      new AppError({
        error: 'Business Rule Error',
        message: 'Appointment time is already occupied',
        statusCode: 409,
      }),
    )
    const { result } = renderHookWithProviders(() => useBookingViewModel())

    act(() => {
      result.current.handleSelectDoctor(doctorFixture)
      result.current.handleSelectSlot('09:00')
    })

    await act(async () => {
      await result.current.handleConfirm()
    })

    expect(result.current.error).toBe('Este horário acabou de ficar indisponível.')
  })
})
