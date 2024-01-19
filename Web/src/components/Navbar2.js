import React from 'react'
import { GiPresent } from "react-icons/gi";
import './Navbar2.css'

const Navbar2 = () => {
  return (
    <nav>
      <div className='logo'>
        <GiPresent className='LG' size={70} color='#ffffff'/>
        <p className='logo-text'><span>S</span>t<span>i</span>t<span>c</span>h<span>e</span>s</p>
      </div>
    </nav>
  )
}

export default Navbar2