import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../config/api'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleLogin(event) {

        event.preventDefault()

        const response = await fetch(
            `${API_URL}/api/Auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )

        if (!response.ok) {
            alert('Email ou senha inválidos.')
            return
        }

        const data = await response.json()

        localStorage.setItem("token", data.token)

        navigate("/app")

    }

    return (

        <main className="auth-page">

            <div className="auth-card">

                <h1>Login</h1>

                <p className="auth-subtitle">Organize seus hábitos e evolua todos os dias.</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Entrar no DailyXP
                    </button>

                </form>

                <p>

                    Não possui conta?

                    <Link to="/register">
                        Cadastre-se
                    </Link>

                </p>
            </div>

        </main>

    )

}

export default Login