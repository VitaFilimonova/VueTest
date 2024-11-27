export const LocalStorageService = {
  getUsers () {
    window.addEventListener('users-localstorage-changed', (event) => {
      this.data = event.detail.storage
    })
    return JSON.parse(localStorage.getItem('users')) || []
  },
  saveUser (user) {
    const users = this.getUsers()
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    window.dispatchEvent(
      new CustomEvent('users-localstorage-changed', {
        detail: {
          storage: localStorage.getItem('users')
        }
      })
    )
    return users
  }
}

export const groupUsers = (users, bossId = null, level = 0) => {
  if (!Array.isArray(users)) return []
  return users
    .filter((user) => Number(user.boss) === Number(bossId))
    .map((user) => ({
      ...user,
      level,
      subordinates: groupUsers(users, user.id, level + 1)
    }))
}

export const sortData = (data, field, direction) => {
  if (!field) return data

  const sorted = [...data].sort((a, b) => {
    const getField = (item) =>
      field === 'phone'
        ? String(item[field] || '').replace(/\D/g, '')
        : String(item[field] || '')

    return (
      getField(a).localeCompare(getField(b), undefined, { numeric: true }) *
      direction
    )
  })

  return sorted.map((item) => ({
    ...item,
    subordinates: sortData(item.subordinates || [], field, direction)
  }))
}
