const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Conncect DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to the storefront API' }));

const auth = require('./routes/auth');
const clients = require('./routes/clients');
const stores = require('./routes/stores');
const products = require('./routes/products');

app.use('/api/auth', auth);
app.use('/api/clients', clients);
app.use('/api/stores', stores);
app.use('/api/products', products);

// if (process.env.NODE_ENV === 'production') {
// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
