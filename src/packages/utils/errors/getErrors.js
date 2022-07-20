export const getErrors = errors => {
  return errors.reduce((acc, item) => {
    acc = [ ...acc, ...item.messages ]

    return acc
  }, [])
}
