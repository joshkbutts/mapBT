import translateServerErrors from '../../../translateServerErrors'

const postComment = async (newCommentData, id) => {
  try {
    const response = await fetch(`/api/v1/comments/${id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(newCommentData)
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
  }
  catch (error) {
    console.error(`Error in fetch: ${error.message}`)
  }
}

export default postComment