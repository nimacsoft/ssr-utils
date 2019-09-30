import React from 'react'
import { Route } from 'react-router-dom'

interface HttpStatus {
  code: number
}

const HttpStatus: React.FC<HttpStatus> = ({ children, code }) => {
  return (
    <Route
      render={({ staticContext }) => {
        // we have to check if staticContext exists
        // because it will be undefined if rendered through a BrowserRouter
        if (staticContext) {
          staticContext.statusCode = code
        }
        return children
      }}
    />
  )
}

export default HttpStatus
