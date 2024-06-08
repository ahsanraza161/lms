import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import AdminContext from '../../../../context/admin/admincontext';
import toast, { Toaster } from 'react-hot-toast';
import Note from './note';

function AllNotes() {
  const { addNote, editNote, deleteNote, notes, getNotes } = useContext(AdminContext);
  const [data, setData] = useState({
    title: '',
    content: '',
    _id: '', // Add _id field to track the ID of the note being edited
  });

  // Function to handle adding or editing a note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (data.title !== '' && data.content !== '') {
      if (data._id) {
        // If _id exists, it means we're editing an existing note
        editNote(data._id, data);
      } else {
        // Otherwise, we're adding a new note
        addNote(data);
      }
      
      // Clear the form fields after submission
      setData({
        ...data, // Preserve existing note data
        title: '',
        content: '',
      });
    } else {
      toast.error('Please fill out all fields');
    }
  };
  

  // Function to set the data of the note to be edited
  const setCurrentData = (note) => {
    setData({
      title: note.title,
      content: note.content,
      _id: note._id, // Set the _id field to the ID of the note being edited
    });
  };

  // Function to handle changes in form fields
  const onChangeHandler = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch notes when component mounts
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div >
      <Grid className="noteDash" container spacing={2} sx={{
              background: 'linear-gradient(to right bottom, #430089, #2f0027)',
              padding: '16px',
              color: '#fff',
            }}>
        <Grid item xs={12}>
          <h2>Notes</h2>
          <form onSubmit={handleAddNote}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              name="title"
              onChange={onChangeHandler}
              value={data.title}
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              name="content"
              onChange={onChangeHandler}
              value={data.content}
            />
            <Button type="submit" variant="contained" color="primary">
              {data._id ? 'Edit Note' : 'Add Note'} {/* Change button label based on whether we're editing or adding */}
            </Button>
          </form>
        </Grid>
        {notes.length > 0 &&
  notes.map((note) => (
    <Note
      title={note.title}
      content={note.content}
      key={note._id} // Use the unique ID of each note as the key
      id={note._id}
      setCurrentData={setCurrentData}
      deleteNote={deleteNote}
    />
  ))
}
      </Grid>
      <Toaster />
    </div>
  );
}

export default AllNotes;
