import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Homedummy = () => {
  return (
    <div className='flex my-6 lg:my-0 lg:min-h-[90vh] '>
        <Row className='container mx-auto py-10 '>
            <Col lg={6} className='my-auto'>
                <div className='mx-auto relative my-auto'>
                    <img className=' rounded-[70px]' src={require('../Assest/dummy1.jpg')} alt="dummy1" />
                    <p style={{color:'rgb(175,138,216,0.9)'}} className='absolute top-0 text-9xl fw-bolder lg:-left-10'>01</p>
                </div>
            
            </Col>
            <Col lg={6} className=''>
                <div className='my-5'>
                    <p className='text-3xl xl:text-5xl fw-semibold  '>Discover <span className='text-violet-800'> print ideas</span> and inspiration</p>
                    <p className='text-lg  '>Pick up tips and get inspired by our latest blogs.</p>
                </div>
                <div  className='mx-auto relative my-auto'>
                    <img className=' rounded-[70px]' src={require('../Assest/dummy2.jpg')} alt="dummy1" />
                    <p style={{color:'rgb(116,152,251,0.9)'}} 
                    className='absolute fade-in-up bottom-0 text-9xl fw-bolder lg:-left-10'>02</p>
                </div>
            
            </Col>
        </Row>

    </div>
  )
}

export default Homedummy