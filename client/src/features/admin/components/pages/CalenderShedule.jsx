// import { useState, useEffect } from 'react';
// import './calender.css'; // Import your custom CSS file
// import AddScheduleForm from './AddScheduleForm';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';

// // Replace with actual backend API calls when available
// const addSchedule = async (newEvent) => {
//   console.log('New event:', newEvent); // Simulate saving to backend
// };

// const fetchSchedules = async () => {
//   return [
//     // Define dummy events here
//     {
//       title: 'Class Meeting - Biology',
//       start: new Date('2024-04-15T09:00:00'),
//       end: new Date('2024-04-15T10:00:00'),
//       allDay: false,
//     },
//     {
//       title: 'Project Submission Deadline - Math',
//       start: new Date('2024-04-17T18:00:00'),
//       end: null, // Leave end undefined for single-day events
//       allDay: false,
//     },
//     // ... add more dummy events
//   ];
// };

// function Calender() {
//   const [events, setEvents] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const loadSchedules = async () => {
//       const fetchedEvents = await fetchSchedules();
//       setEvents(fetchedEvents); // Update events state
//     };
//     loadSchedules();
//   }, []);

//   const handleEventAdd = async (newEvent) => {
//     await addSchedule(newEvent); // Simulated backend call
//     setEvents([...events, newEvent]); // Update local event state
//     setShowForm(false); // Hide the form
//   };

//   const calendarProps = {
//     plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
//     initialView: 'timeGridWeek',
//     events: events,
//     height: '90vh',
//     editable: true,
//     eventAdd: handleEventAdd,
//     headerToolbar: {
//       left: 'today prev,next',
//       center: 'title',
//       right: 'dayGridMonth,timeGridWeek,timeGridDay',
//     },
//     slotDuration: '01:00', // Set the slot duration to 1 hour
//     slotLabelInterval: '01:00', // Set the slot label interval to 1 hour
//     slotLabelFormat: { // Set the slot label format
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     },
//   };

//   return (
//     <div className="calendar-container">
//       <button className="addBtn" onClick={() => setShowForm(true)}>
//         Add Schedule
//       </button>
//       {showForm && <AddScheduleForm onAdd={handleEventAdd} />}
//       <FullCalendar {...calendarProps} />
//     </div>
//   );
// }

// export default Calender;
