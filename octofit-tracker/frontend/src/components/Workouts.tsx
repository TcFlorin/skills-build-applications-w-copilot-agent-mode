import { useEffect, useState } from 'react'

interface WorkoutsProps {
  apiBase: string
}

interface Workout {
  _id: string
  planName: string
  totalDurationMinutes: number
  completed: boolean
  scheduledFor: string
  user?: { name: string }
}

function Workouts({ apiBase }: WorkoutsProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${apiBase}/workouts`)
        const data = await res.json()
        setWorkouts(Array.isArray(data.workouts) ? data.workouts : data.workouts?.data ?? [])
      } catch (err) {
        setError('Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [apiBase])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>{workout.planName}</strong> — {workout.totalDurationMinutes} mins{' '}
              {workout.completed ? '(Completed)' : '(Planned)'}
              {workout.user && <span> for {workout.user.name}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Workouts
