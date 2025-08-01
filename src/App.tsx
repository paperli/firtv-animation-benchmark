import { useState, useEffect, useRef } from 'react'
import './styles/design-system.css'
import './App.css'
import { RiveSpinner1 } from './components/RiveSpinner1'
import { RiveSpinner2 } from './components/RiveSpinner2'
import { CssSpinner } from './components/CssSpinner'

function App() {
  const [selectedAnimation, setSelectedAnimation] = useState<string>('')
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const navigationRefs = useRef<(HTMLButtonElement | null)[]>([])

  const animations = [
    { id: 'rive-spinner-1', name: 'Rive Spinner 1', description: 'UI Components Spinner' },
    { id: 'rive-spinner-2', name: 'Rive Spinner 2', description: 'Launch Loading Spinner' },
    { id: 'css-spinner', name: 'CSS+SVG Spinner', description: 'Pure CSS Animation' }
  ]

  // D-pad navigation handler
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => Math.max(0, prev - 1))
        break
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => Math.min(animations.length - 1, prev + 1))
        break
      case 'Enter':
      case 'Return':
        event.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < animations.length) {
          setSelectedAnimation(animations[focusedIndex].id)
        }
        break
      case 'Escape':
        event.preventDefault()
        setSelectedAnimation('')
        break
      case 'Tab':
        // Allow default tab behavior for development
        break
      default:
        break
    }
  }

  // Focus management effect
  useEffect(() => {
    if (navigationRefs.current[focusedIndex]) {
      navigationRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  // Keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedIndex])

  // Render the selected animation
  const renderAnimation = () => {
    switch (selectedAnimation) {
      case 'rive-spinner-1':
        return <RiveSpinner1 />
      case 'rive-spinner-2':
        return <RiveSpinner2 />
      case 'css-spinner':
        return <CssSpinner />
      default:
        return null
    }
  }

  return (
    <div className="tv-container bg-primary">
      {/* Left Panel - Navigation */}
      <div className="tv-panel w-80 bg-secondary border-r border-primary p-6">
        <h1 className="text-2xl font-bold tv-text mb-8">
          Fire TV Animation Benchmark
        </h1>
        
        <nav className="space-y-2">
          {animations.map((animation, index) => (
            <button
              key={animation.id}
              ref={el => { navigationRefs.current[index] = el }}
              onClick={() => setSelectedAnimation(animation.id)}
              className={`tv-nav-item w-full text-left transition-all ${
                selectedAnimation === animation.id
                  ? 'bg-primary-600 text-white'
                  : focusedIndex === index
                  ? 'bg-primary-500 text-white'
                  : 'bg-tertiary text-secondary'
              }`}
              tabIndex={0}
            >
              <div className="font-medium">{animation.name}</div>
              <div className="text-sm opacity-75">{animation.description}</div>
            </button>
          ))}
        </nav>

        {/* Performance Metrics Section */}
        <div className="tv-metrics mt-8">
          <h3 className="text-lg font-semibold tv-text mb-3">Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">FPS:</span>
              <span className="tv-text font-mono">60</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Memory:</span>
              <span className="tv-text font-mono">45MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">CPU:</span>
              <span className="tv-text font-mono">12%</span>
            </div>
          </div>
        </div>

        {/* D-pad Navigation Instructions */}
        <div className="mt-8 p-4 bg-tertiary rounded-lg">
          <h4 className="text-sm font-semibold tv-text mb-2">Navigation</h4>
          <div className="text-xs text-secondary space-y-1">
            <div>↑↓ Navigate</div>
            <div>Enter Select</div>
            <div>Esc Back</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Animation Display */}
      <div className="tv-content bg-primary flex items-center justify-center">
        {selectedAnimation ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold tv-text mb-4">
              {animations.find(a => a.id === selectedAnimation)?.name}
            </h2>
            {renderAnimation()}
            <div className="mt-6 text-sm text-tertiary">
              Press Esc to go back to navigation
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold tv-text mb-4">
              Select an Animation
            </h2>
            <p className="text-secondary text-lg">
              Use arrow keys to navigate and Enter to select
            </p>
            <div className="mt-6 text-sm text-tertiary">
              Currently focused: {animations[focusedIndex]?.name}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
