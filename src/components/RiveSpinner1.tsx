import { useRive } from '@rive-app/react-canvas'

interface RiveSpinner1Props {
  className?: string
}

export function RiveSpinner1({ className = '' }: RiveSpinner1Props) {
  const { RiveComponent } = useRive({
    src: '/assets/rive/ui_components.riv',
    artboard: 'spinner',
    autoplay: true,
  })

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <RiveComponent
        style={{
          width: '200px',
          height: '200px',
        }}
      />
    </div>
  )
} 