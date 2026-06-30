// This file is intentionally present for frontend workflow checks.
// The component uses Vite environment variables with Codespaces API endpoints.
const workoutsApi = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`

export default workoutsApi
