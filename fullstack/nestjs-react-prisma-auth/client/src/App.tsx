import './App.css'
import { useStore } from './store'
import shallow from 'zustand/shallow'

function App() {

  const {
    countSlice: {
      count,
      increment,
    },
    authSlice: {
      login,
      logout,
      getProfile,
      token,
      user,
    }
  } = useStore(state => ({
    countSlice: state.count,
    authSlice: state.auth
  }), shallow)

  return (
    <div className="App">
      <h1>app_name</h1>
      <p>Current count: {count}</p>
      <p>Current user: {JSON.stringify(user)}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => login('admin', 'admin')}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={getProfile}>Get Profile</button>
    </div>
  )
}

export default App
