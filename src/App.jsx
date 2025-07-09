import './App.css'
import BottomSheet from './components/BottomSheet'

function App() {
  
  return (
    <>
      <div>
        <h1>React Bottom sheet assignment</h1>
        <p>Main content</p>
        <BottomSheet>
          <h2>Bottom Sheet Content</h2>
          <p>inside the bottom sheet</p>
          <p>More content here....</p>
        </BottomSheet>
      </div>
    </>
  )
}

export default App
