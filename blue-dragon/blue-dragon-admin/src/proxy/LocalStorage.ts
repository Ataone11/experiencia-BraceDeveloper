const verify = () => {
  if (typeof window !== 'undefined') {
    return true
  }
  return false
}

export const changeLanguage = (idioma: string) => {
  if (!verify()) return
  localStorage.setItem('idioma', idioma)
}

export const getLanguage = () => {
  if (!verify()) return 'es'
  const idioma = localStorage.getItem('idioma') ?? 'es'
  return idioma
}

export const setCodeAuth = (code: string) => {
  if (!verify()) return
  localStorage.setItem('code', code)
}

export const getCodeAuth = () => {
  if (!verify()) return null
  let code = localStorage.getItem('code') ?? null
  return code
}
