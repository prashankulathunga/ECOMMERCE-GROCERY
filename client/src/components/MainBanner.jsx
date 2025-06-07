import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

function MainBanner() {
  return (
    <div className='relative'>
      <img src={assets.main_banner_bg} className='w-full hidden md:block' alt="main-banner" />
      <img src={assets.main_banner_bg_sm} className='w-full block md:hidden' alt="main-banner" />
      <div className='absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness You can Trust, Savings You will Love!</h1>
        </div>
        <div className='flex items-center mt-6 gap-2'>
            <Link className='group gap-2 flex items-center px-7 md:px-9 py-3 cursor-pointer bg-primary hover:bg-primary-dull transition rounded text-white' to={"/product"}>Shop Now
            <img className='transition group-hover:translate-x-1 block md:hidden' src={assets.white_arrow_icon} alt="arrow" />
            </Link>
            <Link className='hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer group' to={"/product"}>Explore Deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
            </Link>
            
        </div>
      </div>
    </div>
  )
}

export default MainBanner
