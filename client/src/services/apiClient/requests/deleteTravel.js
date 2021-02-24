const deleteTravel = async (markerData) => {
  try {
    const response = await fetch(`/api/v1/markers/${markerData}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    })
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

export default deleteTravel