export const validateName = (value) => {
  if (/[^a-zA-Zа-яА-ЯёЁ\s-]/g.test(value)) {
    return 'Имя может содержать только буквы и -'
  }
  return ''
}

export const validatePhone = (value) => {
  const sanitizedValue = value.startsWith('+') ? value.slice(1) : value
  const isInvalidSymbol = /[^0-9-]/.test(sanitizedValue)

  if (isInvalidSymbol) {
    return "Телефон может содержать только цифры и '-'"
  }

  const finalValue = sanitizedValue.replace(/[^\d-]/g, '')

  if (finalValue.length > 14) {
    return 'Номер телефона не должен превышать 14 цифр'
  }
  if (finalValue.length < 10 && finalValue !== '') {
    return 'Номер телефона должен быть не менее 10 цифр'
  }
  return ''
}
