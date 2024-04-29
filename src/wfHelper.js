export const API_BASE_URL = 'http://bencana_back.me/'

export const parsys = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}sy_config/readByName/${name}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const isLogged = (navigate, isLoggedIn) => {
  if (isLoggedIn) {
    navigate('/backend/sy-config-list')
  } else {
    navigate('/login')
  }
}
