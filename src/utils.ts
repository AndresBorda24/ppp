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

/**
 * Retorna fecha actual.
 * @returns {string} Fecha actual con el formato aaaa-mm-dd hh:mm:ss
 */
export function getCurrentDateTime() {
  const now = new Date();
  // Se utiliza CA(nada) por que allá manejan la fecha en el formato: aaaa-mm-dd
  return now.toLocaleString('en-CA', { hour12: false }).replace(',', '');
}
