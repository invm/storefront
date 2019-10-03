const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to the storefront API' }));

const auth = require('./routes/auth');
const clients = require('./routes/clients');
const orders = require('./routes/orders');

app.use('/api/auth', auth);
app.use('/api/clients', clients);
app.use('/api/orders', orders);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
