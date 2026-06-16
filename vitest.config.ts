import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'expo-router': fileURLToPath(new URL('./src/test/mocks/expo-router.ts', import.meta.url)),
      'react-native': fileURLToPath(new URL('./src/test/mocks/react-native.tsx', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.styles.ts',
        'src/**/index.ts',
        'src/app/**',
        'src/domain/entities/**',
        'src/domain/ports/**',
        'src/constants/**',
        'src/features/**/hooks/**',
        'src/features/**/screens/**',
        'src/infra/factories/**',
        'src/infra/query/**',
        'src/test/**',
        'src/types/**',
      ],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 80,
        lines: 80,
      },
    },
    server: {
      deps: {
        inline: [/react-native/, /expo/, /@testing-library/],
      },
    },
  },
})
