const mongoose = require("mongoose");
const dns = require("dns");

// Cấu hình Node.js sử dụng DNS của Google để tránh lỗi không phân giải được tên miền Atlas trên Windows (lỗi 127.0.0.1)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;