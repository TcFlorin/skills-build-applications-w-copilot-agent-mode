import { useEffect, useState } from 'react'

interface LeaderboardProps {
  apiBase: string
}

interface LeaderboardRow {
  _id: string
  entityType: string
  entityName: string
  rank: number
  score: number
}

function Leaderboard({ apiBase }: LeaderboardProps) {
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${apiBase}/leaderboard/`)
        const data = await res.json()
        setRows(Array.isArray(data.leaderboard) ? data.leaderboard : data.leaderboard?.data ?? [])
      } catch (err) {
        setError('Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [apiBase])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Type</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                <td>{row.rank}</td>
                <td>{row.entityName}</td>
                <td>{row.entityType}</td>
                <td>{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default Leaderboard
