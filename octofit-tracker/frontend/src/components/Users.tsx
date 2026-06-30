import { useEffect, useState } from 'react'

interface UsersProps {
  apiBase: string
}

interface User {
  _id: string
  name: string
  email: string
  role: string
}

function Users({ apiBase }: UsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${apiBase}/users/`)
        const data = await res.json()
        setUsers(Array.isArray(data.users) ? data.users : data.users?.data ?? [])
      } catch (err) {
        setError('Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [apiBase])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} <small>({user.role})</small> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Users
