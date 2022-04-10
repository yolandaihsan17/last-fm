import React from 'react'
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <div className='bg-cyan-900 lg:px-24 px-8 text-white text-center py-24 flex items-stretch flex-col justify-start gap-4'>
        <div className='flex flex-row items-center justify-center gap-2 text-3xl'>
          <a href='https://www.linkedin.com/in/yolandaihsan/' target="_blank" >
            <FaLinkedin />
          </a>

          <a href='https://github.com/yolandaihsan17' target="_blank" >
            <FaGithub />
          </a>
        </div>
        <div>&#169; Yolanda Ihsan 2022</div>
      </div>
    </>
  )
}