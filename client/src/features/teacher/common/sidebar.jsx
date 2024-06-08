import React from 'react'
import { Link } from 'react-router-dom'
import './UserSidebar.css'
import {
  FaTh,
  FaNotesMedical,
  
} from 'react-icons/fa';
import { HiClipboardList } from 'react-icons/hi';


const UserSidebar = ({ activepage }) => {
  return (
    <div className='usersidebar'>

      
{/* {
        activepage === 'yourdashboard' ?
          <div className='s2'>
                        <FaTh/>

            <span>Your Dashboard</span>
          </div>

          :
          <Link
            to='/teacher/yourdashboard' className='stylenone'>
            <div className='s1'>
             <FaTh/>

              <span>Your Dashboard</span>
            </div>
          </Link>
      } */}
      
      {
  activepage === 'allnotes' ?  // Corrected to 'allnotes' instead of 'allNotes'
    <div className='s2'>
      <FaNotesMedical />
      <span>Noteboard</span>
    </div>
    :
    <Link
      to='/teacher/allnotes' className='stylenone'>
      <div className='s1'>
        <FaNotesMedical />
        <span>Noteboard</span>
      </div>
    </Link>
}

      
{
        activepage === 'yourcourses' ?
          <div className='s2'>
                        <HiClipboardList />

            <span>Your Courses</span>
          </div>

          :
          <Link
            to='/teacher/yourcourses' className='stylenone'>
            <div className='s1'>
            <HiClipboardList />


              <span>Your Courses</span>
            </div>
          </Link>
      }

      {
        activepage === 'accountsettings' ?
          <div className='s2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Account Settings</span>
          </div>
          :
          <Link
            to='/teacher/accountsettings'
            className='stylenone'

          >
            <div className='s1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Account Settings</span>
            </div>
          </Link>
      }


      
      
    </div>
  )
}

export default UserSidebar