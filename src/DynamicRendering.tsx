import React from "react"
import { useNearScreen } from './useNearScreen'

interface DynamicRendering {
  isBot: boolean
  force?: boolean
}

const DynamicRendering: React.FC<DynamicRendering> = ({ children, isBot, force = false }) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const isNearScreen = useNearScreen({ ref })

  if (isBot || isNearScreen || force) {
    return <>{children}</>
  } else {
    return (
      <div ref={ref} style={{ height: `100px`, border: '1px solid red' }} />
    )
  }
}

export default DynamicRendering