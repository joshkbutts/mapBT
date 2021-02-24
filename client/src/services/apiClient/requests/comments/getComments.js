const getComments = async (id) => {
  try {
    const response = await fetch(`/api/v1/comments/${id}`)
    if (!response.ok) {
      const errorMessage = `${response.status} ${response.statusText}`
      const error = new Error(errorMessage);
      throw (error)
    }
    const body = await response.json()
    return body
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default getComments