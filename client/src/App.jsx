import { useState } from 'react'
import MotivationalPage from './MotivationalPage'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const endpoint = isLogin ? '/api/login' : '/api/signup'
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      
      if (response.ok) {
        if (isLogin) {
          setIsLoggedIn(true)
        } else {
          setMessage('Cadastro realizado! Faça login.')
          setIsLogin(true)
        }
      } else {
        setMessage(data.message)
      }
    } catch (err) {
      setMessage('Erro de conexão')
    }
  }

  if (isLoggedIn) {
    return <MotivationalPage username={username} onLogout={() => setIsLoggedIn(false)} />
  }

  return (
    <div className="container">
      <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>
      <form className="card" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Usuário</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Digite seu usuário"
            required 
          />
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Digite sua senha"
            required 
          />
        </div>
        <button type="submit">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
        {message && <p className="message">{message}</p>}
        <p className="toggle">
          {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
          <span onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
            {isLogin ? 'Cadastre-se' : 'Faça Login'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default App
