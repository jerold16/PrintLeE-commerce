import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className='h-[100vh] flex '>
        <Spinner className='m-auto w-fit' animation="border"/>

    </div>
  )
}

export default Loading