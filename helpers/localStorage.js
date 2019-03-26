const updateItem = (id, name) => {
  if (!localStorage) return
  const saved = JSON.parse(localStorage.getItem('saved') || '{}')
  saved[id] = name
  localStorage.setItem('saved', JSON.stringify(saved))
  return true
}

const removeItem = (id) => {
  if (!localStorage) return
  let saved = JSON.parse(localStorage.getItem('saved') || '{}')

  if (saved[id]) delete saved[id]

  localStorage.setItem('saved', JSON.stringify(saved))
}

const getItems = () => {
  if (!localStorage) return
  const saved = JSON.parse(localStorage.getItem('saved') || '{}')
  return saved
}

const getItem = (id) => {
  if (!localStorage) return
  const saved = JSON.parse(localStorage.getItem('saved') || '{}')
  return (saved[id] || null)
}

export {
  updateItem,
  removeItem,
  getItems,
  getItem
}
