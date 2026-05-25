import { useState, useEffect } from 'react'

import './style.css'

import AddHabitForm from './components/AddHabitForm'
import HabitCard from './components/HabitCard'

function App() {

  const [habits, setHabits] = useState(() => {

  const savedHabits = localStorage.getItem('habits')

    if (savedHabits) {
      return JSON.parse(savedHabits)
    }

    return []

  })

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
      'habits',
      JSON.stringify(habits)
    )

  }, [habits])

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

  function addHabit(title) {

    const newHabit = {
      id: Date.now(),
      title: title,
      progress: 0
    }

    setHabits([...habits, newHabit])

  }

   function updateHabitProgress(id) {

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

        return {
          ...habit,
          progress: newProgress
        }

      }

      return habit

    })

    setHabits(updatedHabits)

  }

  function deleteHabit(id) {

    const filteredHabits = habits.filter((habit) => {
      return habit.id !== id
    })

    setHabits(filteredHabits)

    }

    function resetProgress() {

    const confirmed = window.confirm(
      'Tem certeza que deseja resetar todo progresso?'
    )

    if (!confirmed) return

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
        className={`reward-card ${
          rewardUnlocked ? 'reward-unlocked' : ''
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
              className={`day-dot ${
                completedDays.includes(index)
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