import './App.css'
import { useStore } from './store'
import shallow from 'zustand/shallow'

function App() {

  const {
    countSlice: {
      count,
      increment,
    }
  } = useStore(state => ({
    countSlice: state.count,
  }), shallow)

  return (
    <div className="App">
      <h1>app_name</h1>
      <p>Current count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default App
