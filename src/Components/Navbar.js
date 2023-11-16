import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='h-20 flex-no-wrap fixed top-0 flex w-full items-center justify-between bg-transparent backdrop-blur-sm py-2 shadow-lg lg:flex-wrap lg:justify-start lg:py-4'>
      <ul className='flex w-full justify-around font-semibold tracking-wider'>
      <Link to="/" className='hover:shadow-md'><li>Place Order</li></Link>
        <Link to="/pending" className='hover:shadow-md'><li>Pending Order</li></Link>
        <Link to="/completed" className='hover:shadow-md'><li>Completed Order</li></Link>
        <Link to="/" className='hover:shadow-md'><li>Take Order</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
