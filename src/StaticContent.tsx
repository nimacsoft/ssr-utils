import React from 'react'

const StaticContent: React.FC = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const [render, setRender] = React.useState(typeof window === 'undefined')

  React.useEffect(() => {
    // check if the innerHTML is empty as client side navigation
    // need to render the component without server-side backup
    const isEmpty = ref.current.innerHTML === ''
    if (isEmpty) {
      setRender(true)
    }
  }, [])

  // if we're in the server or a spa navigation, just render it
  if (render) {
    return <div>{children}</div>
  }

  // avoid re-render on the client
  return (
    <div
      ref={ref}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: '' }}
    />
  )
}

export default StaticContent