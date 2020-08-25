const key = 'searchKeyword'

export const getItem = () => {
  return JSON.parse(localStorage.getItem(key))
}

export const setItem = (value: string[]) => {
  return localStorage.setItem(key, JSON.stringify(value))
}

export const removeItem = () => {
  return localStorage.removeItem(key)
}
