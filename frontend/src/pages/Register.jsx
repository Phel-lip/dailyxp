import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../config/api'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleRegister(event) {

        event.preventDefault()

        const response = await fetch(

            `${API_URL}/api/Auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            }

        )

        if (!response.ok) {
            alert('Erro ao cadastrar.')
            return
        }

        navigate('/login')

    }

    return (

        <main className="auth-page">

            <div className="auth-card">

                <h1>Cadastro</h1>

                <p className="auth-subtitle">Crie sua conta e comece sua jornada de evolução.</p>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        Criar conta gratuitamente
                    </button>

                </form>

                <p>
                    Já possui uma conta?{" "}
                    <Link to="/login">
                        Entrar
                    </Link>
                </p>

            </div>

        </main>

    )

}

export default Register