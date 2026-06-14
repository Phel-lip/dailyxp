import { useState } from 'react'

function AddHabitForm({ onAddHabit }) {

  const [title, setTitle] = useState('')

  function handleSubmit(event) {

    event.preventDefault()

    if (!title.trim()) return

    onAddHabit(title)

    setTitle('')

  }

  return (

    <form
      className="habit-form"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Novo hábito..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">
        Adicionar
      </button>

    </form>

  )

}

export default AddHabitForm