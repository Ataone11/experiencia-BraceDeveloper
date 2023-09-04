export const parseDate = (date: string) => {
  const dateObj = new Date(date)

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  const day = dateObj.getUTCDate()
  const month = dateObj.getUTCMonth()
  const year = dateObj.getUTCFullYear()
  const hour = dateObj.getUTCHours()
  const minutes = dateObj.getUTCMinutes()

  return `${monthNames[month]} ${day}, ${year}. ${
    hour < 10 ? '0' + hour : hour
  }:${minutes < 10 ? '0' + minutes : minutes}`
}
