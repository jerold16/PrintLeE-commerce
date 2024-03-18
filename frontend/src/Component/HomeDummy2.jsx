import React from 'react'
import { Col, Row } from 'react-bootstrap'

const HomeDummy2 = () => {
  return (
    <div className='my-10 xl:my-0 flex xl:min-h-[90vh]'>
      <Row className='justify-between  container mx-auto my-auto  '>
        <Col lg={5} className='overflow-hidden cardhover p-0  relative rounded-3xl '>
          <img className=' rounded-3xl ' src={require('../Assest/tshirtposter.jpeg')} alt="tshirt poster" />
          <div  style={{backgroundColor:'rgba(0,0,0,0.3)'}}  className='absolute w-100  flex justify-end  h-100 right-0  top-0 '>
         <div
         className='flex flex-col justify-around pe-5'>
          <p className='text-white fw-bolder text-2xl mb-0'>Flat 25 %</p>
         <h4 className='text-white text-4xl fw-bolder w-3/5 '>Booklet and Broucher</h4>
            <button className='p-2 w-fit px-4 rounded-full fw-semibold bg-white'>Shop now</button>
         </div>
          </div>
        </Col>
        <Col lg={5} className='overflow-hidden cardhover p-0  relative rounded-3xl '>
          <img className=' rounded-3xl h-full' src={require('../Assest/poster2.jpeg')} alt="tshirt poster" />
          <div  style={{backgroundColor:'rgba(0,0,0,0.3)'}}  className='absolute w-100  flex justify-end  h-100 right-0  top-0 '>
         <div
         className='flex flex-col justify-around pe-5'>
          <p className='text-white fw-bolder text-2xl mb-0'>Flat 25 %</p>
         <h4 className='text-white text-4xl fw-bolder w-3/5 '>Booklet and Broucher</h4>
            <button className='p-2 w-fit px-4 rounded-full fw-semibold bg-white'>Shop now</button>
         </div>
          </div>
        
        </Col>
      </Row>

        
    </div>
  )
}

export default HomeDummy2