import { useEffect, useState } from 'react'

interface ActivitiesProps {
  apiBase: string
}

interface Activity {
  _id: string
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: string
  user?: { name: string }
}

function Activities({ apiBase }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadActivities() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${apiBase}/activities/`)
        const data = await res.json()
        setActivities(Array.isArray(data.activities) ? data.activities : data.activities?.data ?? [])
      } catch (err) {
        setError('Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [apiBase])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} mins,{' '}
              {activity.caloriesBurned} kcal
              {activity.user && <span> by {activity.user.name}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Activities
