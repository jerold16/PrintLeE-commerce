import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Offerwatch from './Offerwatch'

const HomeOffer = () => {
  return (
    <div className='lg:min-h-[40vh] xl:min-h-[90vh] my-6 lg:my-0 py-3 flex bg-slate-100 '>
        <Row className='my-auto mx-auto'>
            <Col lg={6} className=''>
            <img className='w-100' width='' src={require('../Assest/offerpagepic.png')} loading='lazy' alt="" />
            </Col>
            <Col lg={6} className='poppins flex'>
                <div className='my-auto w-fit mx-auto'>
                <p className='text-purple-700 fw-semibold'>100% best printing</p>
                <h4 className='text-4xl fw-semibold' >Deals of the week never miss!</h4>
                <Offerwatch/>
                <button className=' rounded-full hover:bg-slate-950 transi5 bg-violet-700 text-slate-50 fw-semibold p-3 px-4'>Show now</button>
            
                </div>
               
            </Col>
        </Row>

    </div>
  )
}

export default HomeOffer