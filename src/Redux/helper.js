export function formatError(response) {
    console.log(response?.error, "respose")
  
    if (response?.data) {
      const { data, errors, title, message, error } = response.data
  
      if (data) {
        return Object.values(data).join(', ')
      }
  
     
      if (errors) {
        return Object.values(errors).join(', ')
      }
  
      return message || title
    }
  
    return response?.error?.message ?? response?.error ?? 'Something went wrong!'
  }
  

  