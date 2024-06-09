import React, { useState } from 'react';
import {
  Grid,
  Card,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Note = ({ title, content, id, setCurrentData, deleteNote }) => {
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    // Call setCurrentData to populate form fields with note data
    setLoading(true);
    setCurrentData({
      title,
      content,
      _id: id,
    });
    setLoading(false);
  };

  const handleDeleteClick = () => {
    setLoading(true);
    deleteNote(id);
    setLoading(false);
  };

  return (
    <Grid item xs={12}>
    <Card className="contentNoteDash" style={{
      background: 'linear-gradient(to right bottom, #430089, #2f0027)',
    }
    }>
      <div>
        <Typography className="noteTitle" variant="h6" component="div">
          {title}
        </Typography>
        <Typography className="noteContent" variant="body2" component="div">
          {content}
        </Typography>
      </div>
      <div>
        <IconButton disabled={loading} onClick={handleEditClick}>
          <EditIcon sx={{
            color:"#FFF"
          }
          } />
        </IconButton>
        <IconButton disabled={loading} onClick={handleDeleteClick}>
          <DeleteIcon sx={{
            color:"#FFF"
          }
          } />
        </IconButton>
      </div>
    </Card>
  </Grid>
  );
};

export default Note;
