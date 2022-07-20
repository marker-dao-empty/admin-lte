/**
 * Форматируем объект в FormData
 * @param object
 * @returns {FormData}
 */
export function getFormData (object) {
  const formData = new FormData()

  Object
    .keys(object)
    .forEach(key => {
      if (Array.isArray(object[key])) {
        object[key].forEach(item => {
          formData.append(key, item)
        })
      } else {
        formData.append(key, object[key])
      }
    })

  return formData
}
