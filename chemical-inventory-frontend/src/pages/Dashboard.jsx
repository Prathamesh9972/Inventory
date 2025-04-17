import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard({ user }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate('/')
  }, [user])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name} ({user?.role})</p>
    </div>
  )
}

export default Dashboard
