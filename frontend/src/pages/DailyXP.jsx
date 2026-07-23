import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config/api'

import '../style.css'

import AddHabitForm from '../components/AddHabitForm'
import HabitCard from '../components/HabitCard'

function DailyXP() {

    const token = localStorage.getItem("token")

    const [stats, setStats] = useState(null)

    const navigate = useNavigate();

    const [habits, setHabits] = useState([])

    const [streak, setStreak] = useState(0)

    const [completedDays, setCompletedDays] = useState([])

    const [rewardName, setRewardName] = useState("")

    const [rewardGoal, setRewardGoal] = useState(1000)

    useEffect(() => {

        async function loadHabits() {

            const response = await fetch(
                `${API_URL}/api/Habit`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            setHabits(data)

        }

        loadHabits()

    }, [token])

    useEffect(() => {

        async function loadStats() {

            const response = await fetch(
                `${API_URL}/api/UserStats`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            setStats(data)

            setStreak(data.streak)
            setRewardName(data.rewardName)
            setRewardGoal(data.rewardGoal)
            setCompletedDays(JSON.parse(data.completedDays))

        }

        loadStats()

    }, [token])

    useEffect(() => {

        if (stats === null) return

        saveStats({
            ...stats,
            streak,
            rewardName,
            rewardGoal,
            completedDays: JSON.stringify(completedDays)
        })

    }, [stats, streak, rewardName, rewardGoal, completedDays])

    async function addHabit(title) {

        const response = await fetch(
            `${API_URL}/api/Habit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
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

                const updatedHabit = {
                    ...habit,
                    progress: newProgress,
                    completed: newProgress === 100
                }

                if (newProgress === 100) {

                    const today = new Date().toDateString()

                    const lastDate = stats?.lastCompletedDate

                    if (lastDate !== today) {

                        setStats(prev => ({
                            ...prev,
                            lastCompletedDate: today
                        }))

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
            `${API_URL}/api/Habit/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(habitToUpdate)
            }
        )

        setHabits(updatedHabits)

    }

    async function deleteHabit(id) {

        await fetch(
            `${API_URL}/api/Habit/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            `${API_URL}/api/Habit`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setStats(prev => ({
            ...prev,
            streak: 0,
            rewardName: "",
            rewardGoal: 1000,
            completedDays: "[]",
            lastCompletedDate: null
        }))

    }

    function resetReward() {

        const confirmed = window.confirm(
            'Deseja resetar a recompensa atual?'
        )

        if (!confirmed) return

        setRewardName('')

        setRewardGoal(1000)

    }

    async function saveStats(updatedStats) {

        await fetch(
            `${API_URL}/api/UserStats`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedStats)
            }
        )

    }

    const totalXP = habits.reduce((total, habit) => {
        return total + habit.progress
    }, 0)

    const rewardUnlocked = totalXP >= rewardGoal

    function logout() {

        localStorage.removeItem("token")
        navigate("/login")

    }

    return (

        <main className="app">

            <header className="header">

                <div className="header-left">

                    <h1>🚀 DailyXP</h1>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Sair
                    </button>

                </div>

                <div className="header-right">

                    <div className="xp-box">
                        <span>XP Total</span>
                        <strong>{totalXP}</strong>
                    </div>

                    <div className="streak-box">
                        <span>🔥 Streak</span>
                        <strong>{streak} dias</strong>
                    </div>

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

export default DailyXP
