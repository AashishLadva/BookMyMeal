import React from 'react';
import Style from '../Css/Footer.module.css'

const Footer =()=> {
  return (
    <footer className={`${Style.footer} text-center`}>&copy; 2024 <span className='text-danger'>RSPL</span>, All rights reserved.</footer>
  )
}

export default Footer