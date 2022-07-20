export const getCouples = array => {
  return array.reduce((acc, item) => {
    const label = item.split('_').join(' ')
    const finalLabel = label.charAt(0).toUpperCase() + label.slice(1)
  
    acc.push({
      value: item,
      label: finalLabel,
    })
  
    return acc
  }, [])
}
