import { useState } from 'react';
import './calender.css';

function AddScheduleForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      title,
      start,
      end,
      notes,
    };
    onAdd(newEvent);
    setTitle('');
    setStart('');
    setEnd('');
    setNotes('');
  };

  return (
    <form className="formShedule" onSubmit={handleSubmit}>
      <label className="formlabel">
        Title:
        </label>
        <input
          className="formFields"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      <label className="formlabel">
        Start:
        </label>
        <input
          className="formFields"
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      <label className="formlabel">
        End:
        </label>
        <input
          type="datetime-local"
          className="formFields"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      <label className="formlabel">
        Notes:
        </label>
        <input
          className="formFields"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></input>
      <button className="addBtn" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddScheduleForm;
