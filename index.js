const express = require('express');
const cors = require('cors');
const path = require('path'); // Include path module to handle file paths
const connectdb = require('./db/db');

const app = express();
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight

connectdb();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Api routes
app.use('/api/users', require('./Routes/user'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/admin', require('./Routes/admin'));
app.use('/api/courses', require('./Routes/course'));
app.use('/api/materials', require('./Routes/material'));
app.use('/api/students', require('./Routes/student'));
app.use('/api/attendance', require('./Routes/attendance'));
app.use('/api/note', require('./Routes/note'));
app.use('/api/activity', require('./Routes/activity'));

app.get('/', (req, res) => res.send('<h1>Hello</h1>'));

app.listen(8080, () => {
  console.log('server is listening on port 8080');
});
