import { useEffect, useState } from 'react'

interface TeamsProps {
  apiBase: string
}

interface Team {
  _id: string
  name: string
  sportFocus: string
  points: number
  members?: { name: string }[]
}

function Teams({ apiBase }: TeamsProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTeams() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${apiBase}/teams`)
        const data = await res.json()
        setTeams(Array.isArray(data.teams) ? data.teams : data.teams?.data ?? [])
      } catch (err) {
        setError('Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [apiBase])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {teams.map((team) => (
            <article key={team._id} className="card">
              <h3>{team.name}</h3>
              <p>Focus: {team.sportFocus}</p>
              <p>Points: {team.points}</p>
              {team.members?.length ? (
                <p>Members: {team.members.map((member) => member.name).join(', ')}</p>
              ) : (
                <p>No members yet</p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
