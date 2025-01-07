import React from 'react'
import Header from './Header'
import Footer from './Footer'

const SoloJuntos = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <div className='flex-grow mt-[7rem]'>
            <h1> <strong> -------- FALTA INTEGRAR EL SLIDER -------- </strong></h1>
            <h1> EQUIPO DE TIFERET </h1>
            <h1> EQUIPO COORDINADOR </h1>
            <h1> EQUIPO DE COMUNICACIÓN </h1>

        </div>
        <Footer/>
    </div>
  )
}

export default SoloJuntos
