import React, { useState } from 'react';
import '../../mainadmin.css';
import { RxActivityLog } from "react-icons/rx";
import { BsCalendar2Check } from "react-icons/bs";
import {
  FaTh,
  FaBars,
  FaChalkboardTeacher,
  FaRegAddressCard,
  FaUsersCog,
  FaNotesMedical,
  
} from 'react-icons/fa';
import { SlCalender } from "react-icons/sl";
import { PiStudent } from 'react-icons/pi';
import { BsCalendar2Week } from "react-icons/bs";
import { HiClipboardList } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <FaTh />,
    },
    {
      path: 'students',
      name: 'Students',
      icon: <PiStudent />,
    },
    {
      path: 'faculties',
      name: 'Teachers',
      icon: <FaChalkboardTeacher />,
    },
    {
      path: 'newregistration',
      name: 'Register',
      icon: <FaRegAddressCard />,
    },
    {
      path: 'pendingregistrations',
      name: 'User Manangment',
      icon: <FaUsersCog />,
    },
    {
      path: 'courses',
      name: 'Courses',
      icon: <HiClipboardList />,
    },
    // {
    //   path: 'shedulecalender',
    //   name: 'Calender',
    //   icon: <SlCalender />,
    // },
    {
      path: 'attendence',
      name: 'Attendence',
      icon: <BsCalendar2Check />
    },
    // {
    //   path: 'viewattendence',
    //   name: 'View Attendence',
    //   icon: <BsCalendar2Week />,
    // },
    {
      path: 'allNotes',
      name: 'Notes',
      icon: <FaNotesMedical />,
    },
    {
      path: 'activity',
      name: 'activity',
      icon: <RxActivityLog />
      ,
    },
  ];
  return (
    <div className="container2">
      <div className={isOpen ? 'sidebar2' : 'sidebar'}>
        <div className="top_section">
          <h1
            style={{ display: isOpen ? 'block' : 'none' }}
            className="logo displayB"
          >
            KIT
          </h1>
          <div
            style={{ marginLeft: isOpen ? '40%' : '0px' }}
            className={isOpen ? 'displayH bars' : 'displayH bars'}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <Link to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className={isOpen ? 'displayH' : 'displayH'}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
