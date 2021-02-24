import translateServerErrors from '../../translateServerErrors'

const postTravel = async (newMarkerData, id) => {
  try {
    const response = await fetch(`/api/v1/my-map/${id}/markers`, {
      method: "POST",
      headers: new Headers({
        "Accept": "image/jpeg"
      }),
      body: newMarkerData
    })
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json()
        const newErrors = translateServerErrors(body.errors)
        return setErrors(newErrors)
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

export default postTravel