function HabitCard({
  habit,
  onToggle,
  onDelete
}) {

  return (

    <div
        className={`habit-card ${
        habit.progress === 100 ? 'completed' : ''
        }`}
    >

      <div className="habit-info">

        <span className="habit-title">
            {habit.title}
        </span>

        <div className="progress-bar">

            <div
            className="progress-fill"
            style={{
                width: `${habit.progress}%`
            }}
            ></div>

        </div>

        <span className="habit-xp">
            {habit.progress} XP
        </span>

    </div>

      <div className="habit-actions">

        <button
          className="complete-btn"
          onClick={() => onToggle(habit.id)}
        >
          {habit.progress}% 
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(habit.id)}
        >
          Remover
        </button>

      </div>

    </div>

  )

}

export default HabitCard