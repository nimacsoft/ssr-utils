import React from 'react'
import { Redirect, RedirectProps } from 'react-router-dom'
import HttpStatus from 'HttpStatus'

interface RedirectWithStatus extends RedirectProps {
  status: number
}

const RedirectWithStatus: React.FC<RedirectWithStatus> = ({ from, status, children, ...rest }) => {
  return (
    <HttpStatus code={status}>
      <Redirect {...rest} />
    </HttpStatus>
  )
}
