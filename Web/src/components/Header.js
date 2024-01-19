import React, { useRef } from 'react';
import "../Button.css"
import './Header.css'
import { FaGoogleDrive } from "react-icons/fa";
// import useDrivePicker from 'react-google-drive-picker'

const Header =  ({onSelectImage, toggleHeader }) => {



    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageSelect = (event) => {
        const selectedFile = event.target.files[0];
        onSelectImage(selectedFile);
    };

  return (
    <section id='header'>
        <script src="https://apis.google.com/js/api.js"></script>
        <div className='Header'>
            <p className='header-text'>IMAGE TOOL: STICHING IMAGES</p>
            <p className='header-text2'>Stitch images together with a incredible speed and accuracy</p>
            <p className='header-text3'>Provided by <span>group 10</span>.</p>
        </div>
        <div className='Header-left'>
            {/* <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageSelect} ref={fileInputRef} style={{ display: 'none' }}/> */}
            <button onClick={toggleHeader} className='button'>LET'S GET STARTED</button>
            {/* <button onClick={() => handleOpenPicker()} className='button-drive'>
                <FaGoogleDrive color="var(--full-dark)" size={35} className="mouse"/>
            </button> */}
            {/* <button onClick={handleButtonClick} className='button-drive'>
                <FaGoogleDrive color="var(--full-dark)" size={35} className="mouse"/>
            </button> */}
        </div>
    </section>
    
  )
}

export default Header