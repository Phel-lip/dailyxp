import { useState, useEffect } from 'react'

import './style.css'

import AddHabitForm from './components/AddHabitForm'
import HabitCard from './components/HabitCard'

function App() {

  const [habits, setHabits] = useState([])

  const [streak, setStreak] = useState(() => {

    const savedStreak = localStorage.getItem('streak')

    return savedStreak ? JSON.parse(savedStreak) : 0

  })

  const [completedDays, setCompletedDays] = useState(() => {

    const savedDays = localStorage.getItem('completedDays')

    return savedDays
      ? JSON.parse(savedDays)
      : []

  })

  const [rewardName, setRewardName] = useState(() => {
    return localStorage.getItem('rewardName') || ''
  })

  const [rewardGoal, setRewardGoal] = useState(() => {
    return Number(localStorage.getItem('rewardGoal')) || 1000
  })

  useEffect(() => {

    localStorage.setItem(
      'streak',
      JSON.stringify(streak)
    )

  }, [streak])

  useEffect(() => {

    localStorage.setItem(
      'rewardName',
      rewardName
    )

  }, [rewardName])

  useEffect(() => {

    localStorage.setItem(
      'rewardGoal',
      rewardGoal
    )

  }, [rewardGoal])

  useEffect(() => {

    localStorage.setItem(
      'completedDays',
      JSON.stringify(completedDays)
    )

  }, [completedDays])

  useEffect(() => {

    async function loadHabits() {

      const response = await fetch(
        'http://localhost:5271/api/Habit'
      )

      const data = await response.json()

      setHabits(data)

    }

    loadHabits()

  }, [])

  async function addHabit(title) {

    const response = await fetch(
      'http://localhost:5271/api/Habit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          completed: false
        })
      }
    )

    const newHabit = await response.json()

    setHabits([...habits, newHabit])

  }

  async function updateHabitProgress(id) {

    const updatedHabits = habits.map((habit) => {

      if (habit.id === id) {

        let newProgress = 0

        if (habit.progress === 0) {
          newProgress = 50
        }

        else if (habit.progress === 50) {
          newProgress = 100
        }

        else {
          newProgress = 0
        }

        console.log(
          'Habit:',
          habit.id,
          'Novo progresso:',
          newProgress
        )

        const updatedHabit = {
          ...habit,
          progress: newProgress,
          completed: newProgress === 100
        }

        if (newProgress === 100) {

          const today = new Date().toDateString()

          const lastDate = localStorage.getItem('lastCompletedDate')

          if (lastDate !== today) {

            localStorage.setItem(
              'lastCompletedDate',
              today
            )

            setStreak((prev) => prev + 1)

          }

          const dayIndex = new Date().getDay()

          setCompletedDays((prev) => {

            if (prev.includes(dayIndex)) {
              return prev
            }

            return [...prev, dayIndex]

          })
        }

        return updatedHabit

      }

      return habit

    })

    const habitToUpdate = updatedHabits.find(
      (habit) => habit.id === id
    )

    await fetch(
      `http://localhost:5271/api/Habit/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(habitToUpdate)
      }
    )

    setHabits(updatedHabits)

  }

  async function deleteHabit(id) {

    await fetch(
      `http://localhost:5271/api/Habit/${id}`,
      {
        method: 'DELETE'
      }
    )

    setHabits(
      habits.filter((habit) => habit.id !== id)
    )

  }

  async function resetProgress() {

    const confirmed = window.confirm(
      'Tem certeza que deseja resetar todo progresso?'
    )

    if (!confirmed) return

    await fetch(
      'http://localhost:5271/api/Habit',
      {
        method: 'DELETE'
      }
    )

    setHabits([])

    setStreak(0)

    setCompletedDays([])

    setRewardName('')

    setRewardGoal(1000)

    localStorage.clear()

  }

  function resetReward() {

    const confirmed = window.confirm(
      'Deseja resetar a recompensa atual?'
    )

    if (!confirmed) return

    setRewardName('')

    setRewardGoal(1000)

  }

  const totalXP = habits.reduce((total, habit) => {
    return total + habit.progress
  }, 0)

  const rewardUnlocked = totalXP >= rewardGoal

  return (

    <main className="app">

      <header className="header">

        <h1>DailyXP</h1>

        <div className="xp-box">

          <span>XP Total</span>

          <strong>{totalXP}</strong>

        </div>

        <div className="streak-box">

          <span>🔥 Streak</span>

          <strong>{streak} dias</strong>

        </div>

      </header>

      <AddHabitForm onAddHabit={addHabit} />

      <section className="habit-list">

        {habits.map((habit) => (

          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={updateHabitProgress}
            onDelete={deleteHabit}
          />

        ))}

      </section>

      <section className="reward-section">

        <h2>Meta de Recompensa</h2>

        <div className="reward-form">

          <input
            type="text"
            placeholder="Sua recompensa..."
            value={rewardName}
            onChange={(event) => setRewardName(event.target.value)}
          />

          <input
            type="number"
            placeholder="XP necessária"
            value={rewardGoal}
            onChange={(event) => setRewardGoal(Number(event.target.value))}
          />

        </div>

        <div
          className={`reward-card ${rewardUnlocked ? 'reward-unlocked' : ''
            }`}
        >

          <span className="reward-label">
            🎁 Recompensa
          </span>

          <h3>{rewardName || 'Nenhuma recompensa definida'}</h3>

          <p>
            {totalXP} / {rewardGoal} XP
          </p>

          {rewardUnlocked && (

            <strong className="reward-status">
              Desbloqueada!
            </strong>

          )}

          <button
            className="reset-reward-btn"
            onClick={resetReward}
          >

            Resetar recompensa

          </button>

        </div>

      </section>

      <section className="history-section">

        <h2>Histórico Semanal</h2>

        <div className="week-board">

          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (

            <div
              key={index}
              className="day-item"
            >

              <span>{day}</span>

              <div
                className={`day-dot ${completedDays.includes(index)
                  ? 'active'
                  : ''
                  }`}
              ></div>

            </div>

          ))}

        </div>

      </section>

      <button
        className="reset-btn"
        onClick={resetProgress}
      >

        Resetar Progresso

      </button>

    </main>

  )

}

export default App