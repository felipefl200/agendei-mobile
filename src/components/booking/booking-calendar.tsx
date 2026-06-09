import { LocaleConfig, Calendar, DateData } from 'react-native-calendars'
import Icon from '@/components/icon/icon'
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@/constants/theme'
import { styles } from './booking-calendar.styles'

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
}

LocaleConfig.defaultLocale = 'pt-br'

interface BookingCalendarProps {
  selectedDate: string
  onSelectDate: (date: string) => void
}

function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  return (
    <Calendar
      current={selectedDate}
      firstDay={0}
      hideExtraDays
      markedDates={{
        [selectedDate]: {
          customStyles: {
            container: {
              alignItems: 'center',
              backgroundColor: COLORS.secondary,
              borderRadius: 20,
              justifyContent: 'center',
            },
            text: {
              color: COLORS.white,
              fontWeight: FONT_WEIGHT.bold,
            },
          },
        },
      }}
      markingType="custom"
      monthFormat="MMMM yyyy"
      onDayPress={(day: DateData) => onSelectDate(day.dateString)}
      renderArrow={(direction) => (
        <Icon
          color={COLORS.primaryDark}
          name={direction === 'left' ? 'chevronLeft' : 'chevronRight'}
          size="sm"
        />
      )}
      style={styles.container}
      theme={{
        backgroundColor: COLORS.surface,
        calendarBackground: COLORS.surface,
        dayTextColor: COLORS.primaryDark,
        monthTextColor: COLORS.textPrimary,
        selectedDayBackgroundColor: COLORS.secondary,
        selectedDayTextColor: COLORS.white,
        textDayFontSize: FONT_SIZE.xs,
        textDayFontWeight: FONT_WEIGHT.semibold,
        textDayHeaderFontSize: FONT_SIZE.xs,
        textDayHeaderFontWeight: FONT_WEIGHT.bold,
        textDisabledColor: COLORS.border,
        textMonthFontSize: FONT_SIZE.md,
        textMonthFontWeight: FONT_WEIGHT.extrabold,
        textSectionTitleColor: COLORS.primaryDark,
        todayTextColor: COLORS.primary,
      }}
    />
  )
}

export type { BookingCalendarProps }
export default BookingCalendar
