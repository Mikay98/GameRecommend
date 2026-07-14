# GameRecommend
Build a game recommend system for internship involving the writing of a term paper,developed by 3 members

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Bước 1: Clone dự án về máy
Mở Terminal của bạn và chạy lệnh sau:
```bash
git clone https://github.com/Mikay98/GameRecommend.git
```

---

### Bước 2: Cài đặt và cấu hình Backend

1. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Tạo file cấu hình môi trường `.env` từ file ví dụ `.env.example`:
   * Tạo một file mới tên là `.env` nằm trực tiếp trong thư mục `backend`.
   * Copy toàn bộ nội dung từ file `.env.example` sang file `.env` vừa tạo.
   * Đổi thành tài khoản, mật khẩu cá nhân.
4. Khởi chạy Backend Server:
   ```bash
   npm run dev
   # Hoặc chạy: npm start
   ```
   * *Mặc định Backend sẽ chạy tại địa chỉ:* `http://localhost:5000`

---

### Bước 3: Cài đặt và cấu hình Frontend

1. Mở một terminal mới và di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
3. Khởi chạy Frontend:
   ```bash
   npm run dev
   ```
   * *Mặc định Frontend chạy tại:* `http://localhost:5173` (hoặc cổng được hiển thị trong terminal). Bạn có thể mở trình duyệt và truy cập vào địa chỉ này để sử dụng ứng dụng.

---

## 🧠 Tài liệu thuật toán gợi ý
Xem hướng tiếp cận và chi tiết các bước thực hiện thuật toán tại: **[RECOMMENDATION_SYSTEM.md](docs/RECOMMENDATION_SYSTEM.md)**.
