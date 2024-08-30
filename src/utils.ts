export const datesFormatter = new Intl.DateTimeFormat('es-CO', {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})

export function formatDate(date: Date|string) {
    let DATE = date

    if (typeof date === 'string') {
        const [year, month, day] = date.substring(0,10).split('-').map(Number)
        DATE = new Date(year, month - 1, day)
    }

    return (DATE.toString() === 'Invalid Date')
        ? date as string
        : datesFormatter.format(DATE as Date)
}
