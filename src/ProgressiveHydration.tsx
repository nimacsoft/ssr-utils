import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { useNearScreen } from './useNearScreen'

const EMPTY_HTML = { __html: '' }
const isServer = typeof window === 'undefined'

interface ProgressiveHydration {
  force?: boolean
}

const ProgressiveHydration: React.FC<ProgressiveHydration> = ({
  children,
  force = false,
}) => {
  const ref = useRef<HTMLDivElement>(null!)
  const isNearScreen = useNearScreen({ ref })

  useEffect(
    function() {
      // CLIENT:
      // If we want to force the hydration or the element is near screen
      // then we hydrate the content to get the functionality ready
      if (force || isNearScreen) {
        ReactDOM.hydrate(children as any, ref.current)
      }
    },
    [children, force, isNearScreen]
  )

  // SERVER: Just render the content as usual
  if (isServer) {
    return <div ref={ref}>{children}</div>
  }

  // CLIENT: Avoid hydration until we say so
  return (
    <div
      ref={ref}
      suppressHydrationWarning
      dangerouslySetInnerHTML={EMPTY_HTML}
    />
  )
}

export default ProgressiveHydration
