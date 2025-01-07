import React from 'react'
import Header from './Header'
import Footer from './Footer'
import imgIntegrante1 from '../components/img/Integrante1.png'
import imgIntegrante2 from '../components/img/Diego.png'
import imgIntegrante3 from '../components/img/Maria.png'

import imgIntegrante4 from '../components/img/Stefania.png'
import imgIntegrante5 from '../components/img/Adriana.png'
import imgIntegrante6 from '../components/img/Deborah.png'

const Members = () => {

  return (
    <div className="flex flex-col min-h-screen">
        <Header/>

        <div className="flex-grow mt-[5rem] px-4">
          <h1 className="text-2xl font-bold mb-4 text-center"> Integrantes de Tiferet </h1>

          <div className='flex flex-row justify-center gap-8'>
            <div className='flex flex-col items-center space-y-8'>
              {/* 1 integrante */}
              <p> DAFNA CURIEL </p>
              <img src={imgIntegrante1} alt='Segundo Integrante' className="rounded-full" />

              {/* 2 integrante */}
              <p> DIEGO BENTANCOR </p>
              <img src={imgIntegrante2} alt='Primera Integrante' className="rounded-full" />

              {/* 3 integrante */}
              <p> MARÍA INÉS GARAY </p>
              <img src={imgIntegrante3} alt='Tercer Integrante' className="rounded-full" />
            </div>

            {/* 4 integrante */}
            <div className='flex flex-col items-center space-y-8'>
              <p> STEFANIA RETA </p>
              <img src={imgIntegrante4} alt='Cuarto Integrante' className="rounded-full" />

              {/* 5 integrante */}
              <p> ADRIANA SUÁREZ </p>
              <img src={imgIntegrante5} alt='Quinto Integrante' className="rounded-full" />

              {/* 6 integrante */}
              <p> DEBORAH EZKENAZI </p>
              <img src={imgIntegrante6} alt='Sexto Integrante' className="rounded-full" />
            </div>
          </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Members
