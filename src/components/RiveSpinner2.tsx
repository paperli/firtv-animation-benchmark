import { useRive } from '@rive-app/react-canvas'

interface RiveSpinner2Props {
  className?: string
}

export function RiveSpinner2({ className = '' }: RiveSpinner2Props) {
  const { RiveComponent } = useRive({
    src: '/assets/rive/launch_loading.riv',
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