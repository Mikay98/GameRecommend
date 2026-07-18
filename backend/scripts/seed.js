const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const connectDB = require("../config/db");
const Game = require("../models/Game");

const seedDatabase = async () => {
    try {
        console.log("🔄 Đang kết nối tới MongoDB Atlas...");
        await connectDB();

        console.log("🔄 Đang đọc tệp dữ liệu data.json...");
        const dataPath = path.join(__dirname, "../../data.json");
        const rawData = fs.readFileSync(dataPath, "utf8");
        const { games } = JSON.parse(rawData);

        console.log("🧹 Đang dọn sạch các dữ liệu game cũ trong database...");
        await Game.deleteMany({});

        console.log(`📤 Đang tải ${games.length} game lên database MongoDB Atlas...`);
        const gamesWithStock = games.map(g => ({ ...g, stock: g.stock ?? 100, sold: g.sold ?? 0 }));
        await Game.insertMany(gamesWithStock);

        console.log("✅ Đã đồng bộ dữ liệu game thành công!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Lỗi trong quá trình seed dữ liệu:", error.message);
        process.exit(1);
    }
};

seedDatabase();
