interface Specialty {
  id: string
  name: string
  description: string | null
  icon: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

interface SpecialtySummary {
  id: string
  name: string
}

export type { Specialty, SpecialtySummary }
