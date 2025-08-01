import React from 'react'
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor'

interface PerformanceMetricsProps {
  enabled?: boolean
  showDetails?: boolean
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  enabled = true,
  showDetails = false
}) => {
  const { metrics, resetMetrics, isMonitoring } = usePerformanceMonitor({
    enabled,
    updateInterval: 500 // Update every 500ms for more responsive display
  })

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400'
    if (fps >= 45) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMemoryColor = (percentage: number) => {
    if (percentage < 50) return 'text-green-400'
    if (percentage < 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getCpuColor = (cpu: number) => {
    if (cpu < 30) return 'text-green-400'
    if (cpu < 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  if (!enabled) {
    return (
      <div className="tv-metrics">
        <h3 className="text-base font-semibold tv-text mb-2">Performance</h3>
        <div className="text-sm text-secondary">
          Monitoring disabled
        </div>
      </div>
    )
  }

  return (
    <div className="tv-metrics">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold tv-text">Performance</h3>
        <button
          onClick={resetMetrics}
          className="text-xs bg-primary-600 text-white px-2 py-1 rounded hover:bg-primary-700 transition-colors"
          title="Reset metrics"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary">FPS:</span>
          <span className={`tv-text font-mono ${getFpsColor(metrics.fps)}`}>
            {metrics.fps}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-secondary">Memory:</span>
          <span className={`tv-text font-mono ${getMemoryColor(metrics.memory.percentage)}`}>
            {metrics.memory.used}MB ({metrics.memory.percentage}%)
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-secondary">CPU:</span>
          <span className={`tv-text font-mono ${getCpuColor(metrics.cpu)}`}>
            {metrics.cpu}%
          </span>
        </div>

        {showDetails && (
          <>
            <div className="flex justify-between">
              <span className="text-secondary">Frame Time:</span>
              <span className="tv-text font-mono">
                {metrics.frameTime}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-secondary">Dropped Frames:</span>
              <span className="tv-text font-mono">
                {metrics.droppedFrames}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-secondary">Total Memory:</span>
              <span className="tv-text font-mono">
                {metrics.memory.total}MB
              </span>
            </div>
          </>
        )}
      </div>

      {!isMonitoring && (
        <div className="mt-2 text-xs text-yellow-400">
          Monitoring paused
        </div>
      )}
    </div>
  )
} 