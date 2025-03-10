class DateTimeUtilities {
  formatDateForInput = (dateString) => {
    const parts = dateString.match(/(\d{2})\.\s(\d{2})\.\s(\d{4})\.\s-\s(\d{2}):(\d{2})/)
    if (!parts) return ''

    const [, day, month, year, hours, minutes] = parts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}`
  }
}

export default new DateTimeUtilities()