import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='flex h-[30vh] w-[30vh]'>
        <Spinner className='m-auto' animation='border' />
      
    </div>
  )
}

export default Loading
