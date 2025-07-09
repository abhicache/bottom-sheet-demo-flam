import './App.css'
import BottomSheet from './components/BottomSheet'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Bottom Sheet Demo</h1>
        <p>Try dragging the bottom sheet handle up and down</p>
      </header>
      
      <main>
        <div className="card">
          <h2>Main Content Area</h2>
          <p>This is the main content of the app. The bottom sheet overlays on top of this content.</p>
          <p>You can interact with the bottom sheet by:</p>
          <ul>
            <li>Dragging the handle</li>
            <li>Swiping up/down on the handle</li>
            <li>The sheet will snap to three positions: closed, half-open, and fully open</li>
          </ul>
        </div>
      </main>
      
      <BottomSheet>
        <h2>Settings</h2>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Enable notifications
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Dark mode
          </label>
        </div>
        <div className="setting-item">
          <label>
            Theme color:
            <select>
              <option>Blue</option>
              <option>Green</option>
              <option>Purple</option>
            </select>
          </label>
        </div>
        
        <h3>Account</h3>
        <div className="setting-item">
          <button className="btn-primary">Sign Out</button>
        </div>
        
        <div style={{ height: '200px' }}>
          <p>Extra content to test scrolling...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </BottomSheet>
    </div>
  )
}

export default App
