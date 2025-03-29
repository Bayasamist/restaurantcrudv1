require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const app = express();
app.use(cors());


app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB-connected'))
  .catch(err => console.error('❌ Mongo failed:', err));


const PORT = process.env.PORT ||5001||5000;
app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT} Woorking on this ip`));
