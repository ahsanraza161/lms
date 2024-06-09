import axios from 'axios';

export const fetchSchedules = async () => {
  try {
    const response = await axios.get('/api/schedules');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addSchedule = async (newSchedule) => {
  try {
    const response = await axios.post('/api/schedules', newSchedule);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};