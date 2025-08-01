import { useEffect, useRef } from 'react'

interface CssSpinnerProps {
  className?: string
}

export function CssSpinner({ className = '' }: CssSpinnerProps) {
  const spinnerRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // Add the CSS styles dynamically
    const style = document.createElement('style')
    style.textContent = `
      .css-spinner {
        width: 120px;
        height: 120px;
        transform: rotate(-90deg);
      }

      .css-spinner-arc {
        stroke-dasharray: 0, 250;
        stroke-dashoffset: 250;
        animation: trim 1.5s ease-in-out infinite;
      }

      @keyframes trim {
        0% {
          stroke-dasharray: 0, 250;
          stroke-dashoffset: 250;
        }
        33% {
          stroke-dasharray: 63, 250;
        }
        100% {
          stroke-dasharray: 0, 250;
          stroke-dashoffset: 0;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg 
        ref={spinnerRef}
        className="css-spinner" 
        viewBox="0 0 100 100"
      >
        <circle 
          className="css-spinner-arc" 
          cx="50" 
          cy="50" 
          r="40" 
          fill="none" 
          stroke="#FFEC37" 
          strokeWidth="16" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
} 