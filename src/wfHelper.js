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

export const token = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}Auth/token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    // .then((data) => {
    //   setTokenAwal(data.token)
    // })
  } catch (error) {
    console.error('Error fetching token:', error.message)
    throw new Error('Failed to fetch token: ' + error.message)
  }
}
