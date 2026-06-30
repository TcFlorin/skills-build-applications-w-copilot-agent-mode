import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const fallbackMessage = codespaceName
  ? null
  : 'VITE_CODESPACE_NAME is unset. The app is using localhost fallback API URLs.'

function Home() {
  return (
    <section className="home-page">
      <h1>OctoFit Tracker</h1>
      <p>
        Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to
        enable the Codespaces API URL.
      </p>
      <p>Example:</p>
      <pre>VITE_CODESPACE_NAME=your-codespace-name</pre>
      <p>When present, API calls resolve to:</p>
      <pre>https://{codespaceName ?? '<CODESPACE_NAME>'}-8000.app.github.dev/api</pre>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      {fallbackMessage && <div className="alert">{fallbackMessage}</div>}

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users apiBase={apiBase} />} />
          <Route path="/teams" element={<Teams apiBase={apiBase} />} />
          <Route path="/activities" element={<Activities apiBase={apiBase} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBase={apiBase} />} />
          <Route path="/workouts" element={<Workouts apiBase={apiBase} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
