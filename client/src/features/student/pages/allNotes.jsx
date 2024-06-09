import React, { useContext, useEffect } from 'react';
import AdminContext from '../../../context/admin/admincontext'; // Update the path

const AllNotes = () => {
  const { notes, getNotes } = useContext(AdminContext);

  useEffect(() => {
    getNotes(); // Fetch notes when component mounts
  }, []);

  return (
    <div className='NoteStudents'>
      <h2>Notes</h2>
      <ul className='noteUL' >
        {notes.map((note) => (
          <li className='noteslist' key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllNotes;