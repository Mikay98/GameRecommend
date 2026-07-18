require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Chào mừng bạn đến với Game Store Backend API Demo!');
});

// Kết nối cơ sở dữ liệu MongoDB (sử dụng connectDB để khắc phục DNS trên Windows)
connectDB();

app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy mượt mà tại địa chỉ: http://localhost:${PORT}`);
});