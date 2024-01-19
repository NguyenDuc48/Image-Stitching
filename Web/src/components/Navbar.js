import React from 'react'
import { SiStitcher } from "react-icons/si";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <SiStitcher size={105} color='#ffffff'/>
        <p className='logo-text'>Stitches</p>
      </div>
    </nav>
  )
}

export default Navbar