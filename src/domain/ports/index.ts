export type {
  AppointmentsGateway,
  CancelAppointmentInput,
  CreateAppointmentInput,
} from './AppointmentsGateway'
export type {
  AuthGateway,
  AuthSession,
  LoginCredentials,
  RegisteredPatient,
  RegisterPatientInput,
  RegisterSession,
} from './AuthGateway'
export type { AuthTokenStorage } from './AuthTokenStorage'
export type {
  DoctorAvailabilityGateway,
  GetDoctorAvailabilityInput,
} from './DoctorAvailabilityGateway'
export type { DoctorsGateway, ListDoctorsInput, ListDoctorsResult, Pagination } from './DoctorsGateway'
export type {
  PatientProfileGateway,
  UpdatedPatientAvatar,
  UpdatePatientAvatarInput,
  UpdatePatientPasswordInput,
  UpdatePatientProfileInput,
} from './PatientProfileGateway'
export type { SpecialtiesGateway } from './SpecialtiesGateway'
