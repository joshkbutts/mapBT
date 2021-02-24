const fetchMarker = async (id) => {
  try {
    const response = await fetch(`/api/v1/markers/${id}`)
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default fetchMarker