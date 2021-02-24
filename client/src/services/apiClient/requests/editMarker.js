import translateServerErrors from '../../translateServerErrors'

const editMarker = async (markerData, id) => {
  try {
    const response = await fetch(`/api/v1/markers/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(markerData)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = response.json()
        const newErrors = translateServerErrors(body.errors)
        setErrors(newErrors)
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
    } else {
      const body = await response.json()
      return body
    }
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default editMarker