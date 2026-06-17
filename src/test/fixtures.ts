import { AppointmentDetails, AppointmentSummary } from '@/domain/entities/appointment'
import { Doctor } from '@/domain/entities/doctor'
import { Patient } from '@/domain/entities/patient'
import { Specialty } from '@/domain/entities/specialty'
import { User } from '@/domain/entities/user'

const userFixture: User = {
  active: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  email: 'ana@example.com',
  id: 'user-1',
  lastLoginAt: null,
  name: 'Ana Paciente',
  role: 'patient',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

const specialtyFixture: Specialty = {
  active: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  description: 'Cardiologia clinica',
  icon: null,
  id: 'specialty-1',
  name: 'Cardiologia',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

const doctorFixture: Doctor = {
  active: true,
  availableToday: true,
  avatarUrl: null,
  bio: null,
  clinic: {
    address: 'Rua Central, 123',
    id: 'clinic-1',
    name: 'Clinica Central',
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  crm: '12345',
  email: 'doctor@example.com',
  id: 'doctor-1',
  name: 'Dra. Clara',
  specialty: {
    id: specialtyFixture.id,
    name: specialtyFixture.name,
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
}

const patientFixture: Patient = {
  allergies: 'Penicilina',
  appointmentReminders: true,
  avatarUrl: null,
  birthDate: '1988-04-15T00:00:00.000Z',
  bloodType: 'O+',
  createdAt: '2026-01-01T00:00:00.000Z',
  document: '12345678900',
  email: userFixture.email,
  healthInsuranceCard: '1234567890123456',
  healthInsuranceName: 'Bradesco Saude',
  id: 'patient-1',
  name: userFixture.name,
  phone: '11987654321',
  receiveNotifications: true,
  updatedAt: '2026-01-01T00:00:00.000Z',
}

const appointmentSummaryFixture: AppointmentSummary = {
  clinicName: 'Clinica Central',
  date: '2026-06-22',
  doctorName: 'Dra. Clara',
  id: 'appointment-1',
  specialtyName: 'Cardiologia',
  startTime: '09:00',
  status: 'scheduled',
}

const appointmentDetailsFixture: AppointmentDetails = {
  clinic: {
    id: 'clinic-1',
    name: 'Clinica Central',
  },
  date: '2026-06-22',
  doctor: {
    id: 'doctor-1',
    name: 'Dra. Clara',
  },
  endTime: '09:30',
  id: 'appointment-1',
  specialty: {
    id: 'specialty-1',
    name: 'Cardiologia',
  },
  startTime: '09:00',
  status: 'scheduled',
}

export {
  appointmentDetailsFixture,
  appointmentSummaryFixture,
  doctorFixture,
  patientFixture,
  specialtyFixture,
  userFixture,
}
