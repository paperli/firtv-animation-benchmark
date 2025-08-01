import { useState, useEffect, useRef, useCallback } from 'react'

interface PerformanceMetrics {
  fps: number
  memory: {
    used: number
    total: number
    percentage: number
  }
  cpu: number
  frameTime: number
  droppedFrames: number
}

interface UsePerformanceMonitorOptions {
  enabled?: boolean
  updateInterval?: number
  fpsTarget?: number
}

export const usePerformanceMonitor = (options: UsePerformanceMonitorOptions = {}) => {
  const {
    enabled = true,
    updateInterval = 1000, // Update every second
    fpsTarget = 60
  } = options

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: { used: 0, total: 0, percentage: 0 },
    cpu: 0,
    frameTime: 0,
    droppedFrames: 0
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const frameTimeHistoryRef = useRef<number[]>([])
  const droppedFramesRef = useRef(0)
  const animationFrameRef = useRef<number | undefined>(undefined)

  // FPS calculation
  const measureFPS = useCallback(() => {
    const currentTime = performance.now()
    const deltaTime = currentTime - lastTimeRef.current
    
    if (deltaTime >= 1000) { // Update every second
      const fps = Math.round((frameCountRef.current * 1000) / deltaTime)
      const averageFrameTime = frameTimeHistoryRef.current.length > 0 
        ? frameTimeHistoryRef.current.reduce((a, b) => a + b, 0) / frameTimeHistoryRef.current.length
        : 0
      
      setMetrics(prev => ({
        ...prev,
        fps,
        frameTime: Math.round(averageFrameTime * 100) / 100,
        droppedFrames: droppedFramesRef.current
      }))
      
      frameCountRef.current = 0
      lastTimeRef.current = currentTime
      frameTimeHistoryRef.current = []
      droppedFramesRef.current = 0
    }
    
    frameCountRef.current++
    
    // Track frame time
    const frameTime = performance.now() - currentTime
    frameTimeHistoryRef.current.push(frameTime)
    
    // Keep only last 60 frames for average calculation
    if (frameTimeHistoryRef.current.length > 60) {
      frameTimeHistoryRef.current.shift()
    }
    
    // Detect dropped frames (frame time > 16.67ms for 60fps target)
    const targetFrameTime = 1000 / fpsTarget
    if (frameTime > targetFrameTime * 1.5) {
      droppedFramesRef.current++
    }
    
    animationFrameRef.current = requestAnimationFrame(measureFPS)
  }, [fpsTarget])

  // Memory monitoring
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024)
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024)
      const percentage = Math.round((usedMB / totalMB) * 100)
      
      setMetrics(prev => ({
        ...prev,
        memory: {
          used: usedMB,
          total: totalMB,
          percentage
        }
      }))
    }
  }, [])

  // CPU monitoring (simplified - based on frame time variance)
  const measureCPU = useCallback(() => {
    if (frameTimeHistoryRef.current.length > 10) {
      const recentFrames = frameTimeHistoryRef.current.slice(-10)
      const avgFrameTime = recentFrames.reduce((a, b) => a + b, 0) / recentFrames.length
      const variance = recentFrames.reduce((sum, time) => sum + Math.pow(time - avgFrameTime, 2), 0) / recentFrames.length
      
      // Higher variance indicates more CPU usage
      const cpuLoad = Math.min(100, Math.round((variance / 100) * 100))
      
      setMetrics(prev => ({
        ...prev,
        cpu: cpuLoad
      }))
    }
  }, [])

  // Start monitoring
  useEffect(() => {
    if (!enabled) return

    // Start FPS monitoring
    animationFrameRef.current = requestAnimationFrame(measureFPS)
    
    // Start memory and CPU monitoring
    const intervalId = setInterval(() => {
      measureMemory()
      measureCPU()
    }, updateInterval)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearInterval(intervalId)
    }
  }, [enabled, updateInterval, measureFPS, measureMemory, measureCPU])

  // Reset metrics
  const resetMetrics = useCallback(() => {
    frameCountRef.current = 0
    lastTimeRef.current = performance.now()
    frameTimeHistoryRef.current = []
    droppedFramesRef.current = 0
    
    setMetrics({
      fps: 0,
      memory: { used: 0, total: 0, percentage: 0 },
      cpu: 0,
      frameTime: 0,
      droppedFrames: 0
    })
  }, [])

  return {
    metrics,
    resetMetrics,
    isMonitoring: enabled
  }
} 