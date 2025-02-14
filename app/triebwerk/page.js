import React from 'react'
import ImageSlider from '../components/TriebwerkSlider'
import Headertw from '../components/Headertw'
import Kooperation from '../components/Kooperation'
import Vorteile from '../components/Vorteile'
import {vorteile} from '../../public/constants/index'; // Adjust the path as necessary
import Footer from '../components/Footer'
import TriebwerkCollection from '../components/TriebwerkCollection'

export default function page() {
  return (
    <div>
         <div className='fixed h-[100vh] w-[100%] top-0 right-0 -z-20' style={{ backgroundImage: 'url(/bg-details.png)' }}> </div>
        <Headertw />
        <ImageSlider />
        <div className='translate-y-[-200px] lg:translate-y-0 xl:translate-y-0' id='vision'>
        <Kooperation />
        </div>
        <div id="vorteile">
        <Vorteile vorteile={vorteile}/>
        </div>
        <div id="kollektion">
        <TriebwerkCollection />
        </div>
        <Footer />
    </div>
  )
}
