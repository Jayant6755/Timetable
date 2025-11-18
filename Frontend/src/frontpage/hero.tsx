import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
   <section className='w-full h-screen border-2 border-red-500 flex flex-col justify-center items-center gap-10'>
        <div className='text-4xl '>Welcome to Birla Institue Of Applied Sciences</div>
        <div className='w-100  h-100  flex flex-col items-center gap-10'>
                <div className='text-2xl'>
                    Login As
                </div>

              <Link to={"/adminlogin"}><button className='border-2 border-black p-2 rounded-xl w-50 cursor-pointer'>Admin</button></Link> 
               <Link to={"/teacherlogin"}> <button className='border-2 border-black p-2 rounded-xl w-50 cursor-pointer'>Teacher</button></Link>
               <Link to={"/timetable"}><button className='border-2 border-black p-2 rounded-xl w-50 cursor-pointer'>Student</button></Link> 
        </div>
   </section>
  )
}
