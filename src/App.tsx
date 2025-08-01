import { useState, useEffect, useRef } from 'react'
import './styles/design-system.css'
import './App.css'
import { RiveSpinner1 } from './components/RiveSpinner1'
import { RiveSpinner2 } from './components/RiveSpinner2'
import { CssSpinner } from './components/CssSpinner'
import { PerformanceMetrics } from './components/PerformanceMetrics'

function App() {
  const [selectedAnimation, setSelectedAnimation] = useState<string>('')
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const [showDetailedMetrics, setShowDetailedMetrics] = useState<boolean>(false)
  const [monitoringEnabled, setMonitoringEnabled] = useState<boolean>(true)
  const navigationRefs = useRef<(HTMLButtonElement | null)[]>([])

  const animations = [
    { id: 'rive-spinner-1', name: 'Rive Spinner 1' },
    { id: 'rive-spinner-2', name: 'Rive Spinner 2' },
    { id: 'css-spinner', name: 'CSS+SVG Spinner' }
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
      case 'm':
      case 'M':
        // Toggle monitoring
        event.preventDefault()
        setMonitoringEnabled(prev => !prev)
        break
      case 'd':
      case 'D':
        // Toggle detailed metrics
        event.preventDefault()
        setShowDetailedMetrics(prev => !prev)
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
      <div className="tv-panel w-80 bg-secondary border-r border-primary p-4">
        <h1 className="text-xl font-bold tv-text mb-4">
          Fire TV Animation Benchmark
        </h1>
        
        <nav className="space-y-1">
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
            </button>
          ))}
        </nav>

        {/* Performance Metrics Section */}
        <div className="mt-4">
          <PerformanceMetrics enabled={monitoringEnabled} showDetails={showDetailedMetrics} />
        </div>

        {/* D-pad Navigation Instructions */}
        <div className="mt-4 p-3 bg-tertiary rounded-lg">
          <h4 className="text-sm font-semibold tv-text mb-1">Navigation</h4>
          <div className="text-xs text-secondary space-y-1">
            <div>↑↓ Navigate</div>
            <div>Enter Select</div>
            <div>Esc Back</div>
            <div>M Toggle Monitor</div>
            <div>D Detailed Metrics</div>
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
